# Cross Account Connector 

This directory includes the code and infrastructure for the Cross Account Connector. The Cross Account Connector is a Cloudformation template, a AWS Lambda function and a DynamoDB table, which are used to connect/create cross account credentials from multiple AWS Accounts. The directory includes 3 subdirectories:

* `src` - The AWS Lambda function code for the custom CloudFormation resource, which is invoked during the CloudFormation stack creation (in customer account). It stores the cross account credentials in the DynamoDB table.
* `cdk` - The CDK code for the CloudFormation template, which creates the AWS Lambda function and the DynamoDB table. It also generates the CloudFormation template dynamically and uploads it so S3 

## User flow 

1. The user creates a CloudFormation stack in the customer account, which includes the custom CloudFormation resource. The cloudformation stack creates
   1. a IAM role based on the provided information (role name, policy, etc.)
   2. Invokes the custom CloudFormation resource, which stores the cross account credentials in the DynamoDB table.
2. Managed Portal can now be used to query the DynamoDB table and retrieve the cross account credentials to list the resources in the customer account.


## Infrastructure

The CDK project creates the following infrastructure:

1. public S3 bucket - used to store the CloudFormation template
2. DynamoDB table - used to store the cross account credentials
3. AWS Lambda function - as custom CloudFormation resource, which stores the cross account credentials in the DynamoDB table
4. Generate & Upload CloudFormation template - the CDK project generates the CloudFormation template dynamically and uploads it to the S3 bucket

Output:
* DynamoDB table name - used by the Managed Portal to query the table
* S3 uri - used by the Managed Portal to download the CloudFormation template

## Deploy 

```bash
cd cdk && cdk deploy --profile <profile> 
```

## After Deployment

The CDK project creates/outputs important information, which is needed for the Managed Portal to work properly. You need to add the environment variables to the Managed Portal, so it can query the DynamoDB table. Those variables can be set in [.env](../../app/.env) file.