import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import * as pythonLambda from "@aws-cdk/aws-lambda-python-alpha";

export class AccountGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const publicTemplateBucket = new s3.Bucket(this, "publicBucket", {
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
    });

    publicTemplateBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        resources: [publicTemplateBucket.arnForObjects("*")],
        actions: ["s3:GetObject"],
        principals: [new iam.AnyPrincipal()],
      })
    );

    new s3Deployment.BucketDeployment(this, "assets", {
      sources: [s3Deployment.Source.asset("./assets/")],
      destinationBucket: publicTemplateBucket,
    });

    const table = new dynamodb.Table(this, "table", {
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      deletionProtection: false,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const connectorLambda = new pythonLambda.PythonFunction(
      this,
      "connector-lambda",
      {
        entry: "lambda/connector",
        runtime: lambda.Runtime.PYTHON_3_11,
        index: "index.py",
        handler: "handler",
        environment: {
          table: table.tableName,
        },
        deadLetterQueueEnabled: true,
      }
    );

    connectorLambda.grantInvoke(new iam.AnyPrincipal());

    table.grantReadWriteData(connectorLambda);

    new cdk.CfnOutput(this, "lambdaArn", {
      exportName: "lambdaArn",
      value: connectorLambda.functionArn,
    });

    const apiLambda = new pythonLambda.PythonFunction(this, "api-lambda", {
      entry: "lambda/s3manager",
      runtime: lambda.Runtime.PYTHON_3_11,
      index: "index.py",
      handler: "handler",
      environment: {
        table: table.tableName,
      },
      deadLetterQueueEnabled: true,
    });
    table.grantReadWriteData(apiLambda);
    apiLambda.addFunctionUrl({ authType: lambda.FunctionUrlAuthType.NONE });

    apiLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["*"],
        resources: ["*"],
        effect: iam.Effect.ALLOW,
      })
    );
  }
}
