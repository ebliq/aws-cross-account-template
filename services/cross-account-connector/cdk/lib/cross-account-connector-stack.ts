import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as pythonLambda from "@aws-cdk/aws-lambda-python-alpha";
import { PublicTemplateBucket } from "./constructs/templateBucket";
import * as path from "path";

export interface CrossAccountConnectorProps extends cdk.StackProps {
  namePrefix: string;
  randomSufix: string;
}


export class CrossAccountConnectorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CrossAccountConnectorProps) {
    super(scope, id, props);

    console.log('accountId: ', this.account);
    console.log('region: ', this.region);

    // Create public template bucket which stores the Cloudformation template
    const publicTemplateBucket = new PublicTemplateBucket(this, "publicTemplateBucket", {
      namePrefix: props.namePrefix,
      randomSufix: props.randomSufix,
    });

    // Create DynamoDB table for storing account information
    const table = new dynamodb.Table(this, "crossAccountUserTable", {
      tableName: `${props.namePrefix}-cross-account-user-table-${props.randomSufix}`,
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      deletionProtection: false,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Creates Lambda function as custom resource Cloudformation resource, which is called during the stack creation
    // it adds and removes the account information from the DynamoDB table
    const functionName = `${props.namePrefix}-custom-resource-connector-${props.randomSufix}`
    const connectorLambda = new pythonLambda.PythonFunction(
      this,
      "customResourceConnector",
      {
        functionName: functionName,
        entry: path.join(__dirname, "../../src"), // __dirname == lib/
        runtime: lambda.Runtime.PYTHON_3_11,
        index: "handler.py",
        handler: "handler",
        environment: {
          DYNAMODB_TABLE: table.tableName,
        },
        deadLetterQueueEnabled: true,
      }
    );
    const connectorLambdaArn = `arn:aws:lambda:${this.region}:${this.account}:function:${functionName}`
    // grant invoke permissions to the lambda function from any principal
    // this is required for the custom resource to work
    connectorLambda.grantInvoke(new iam.AnyPrincipal());
    // grant read write permissions to the lambda function from the DynamoDB table
    table.grantReadWriteData(connectorLambda);

    // Generate the Cloudformation template
    const template = publicTemplateBucket.generateTemplate({ lambdaArn: connectorLambdaArn, awsAccountId: this.account })
    // Upload the Cloudformation template to the S3 bucket
    const templateUri = publicTemplateBucket.uploadTemplate({ template });




    // Outputs

    // DynamoDB table name
    new cdk.CfnOutput(this, "DynamoDBTableName", {
      exportName: "DynamoDBTableName",
      value: table.tableName,
    });

    // Cloudformation template URL
    new cdk.CfnOutput(this, "CloudformationTemplateUrl", {
      exportName: "CloudformationTemplateUrl",
      value: templateUri,
    });
  }

}
