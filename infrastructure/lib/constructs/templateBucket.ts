import { Construct } from 'constructs';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as Handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { RemovalPolicy } from 'aws-cdk-lib';

export interface PublicBucketProps extends s3.BucketProps {
  namePrefix: string;
  randomSufix: string;
}
/*
 * Public S3 bucket, which stores the Cloudformation template
 * creates, S3 bucket, S3 bucket policy, S3 bucket policy statement
 * implements template generate methond and uploads template to S3 bucket
 */
export class PublicTemplateBucket extends Construct {
  public readonly publicTemplateBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: PublicBucketProps) {
    super(scope, id);
    console.log(__dirname)

    this.publicTemplateBucket = new s3.Bucket(this, id, {
      bucketName: `${props.namePrefix}-public-template-bucket-${props.randomSufix}`,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      // remove bucket when stack is deleted and delete template file
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Add bucket policy to allow public access to the bucket
    this.publicTemplateBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        resources: [this.publicTemplateBucket.arnForObjects("*")],
        actions: ["s3:GetObject"],
        principals: [new iam.AnyPrincipal()],
      })
    );
  }

  /**
   * Generates the CloudFormation template for this construct
   */
  public generateTemplate({ lambdaArn, awsAccountId }: { lambdaArn: string, awsAccountId: string }) {
    // read template file 
    const templateFile = fs.readFileSync(
      path.join(__dirname, "../../templates/template.json"), // __dirname == lib/constructs
      "utf8"
    );
    // compile template
    const template = Handlebars.compile(templateFile);

    // generate template
    const generatedTemplate = template({ lambdaArn, awsAccountId });
    return generatedTemplate;
  }

  /**
   * Uploads the generated template to the S3 bucket
   */
  public uploadTemplate({ template, region }: { template: string, region: string }) {
    const fileName = "template.json";
    // Upload template json file to the S3 bucket  
    new BucketDeployment(this, "UploadCloudformationTemplate", {
      sources: [Source.data(fileName, template)],
      destinationBucket: this.publicTemplateBucket,
    })
    const templateUri = `https://${this.publicTemplateBucket.bucketName}.s3.${region}.amazonaws.com/${fileName}`
    return templateUri
  }

}
