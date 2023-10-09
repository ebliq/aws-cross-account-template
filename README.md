# Cross Account Connector Example: S3 Manager

This repository includes the code and infrastructure for the Cross Account S3 Manager. The Cross Account S3 Manager is a Managed Portal, which can be used to list the S3 buckets in the customer account. The Managed Portal uses the Cross Account Connector to retrieve the cross account credentials and list the S3 buckets in the customer account. The Cross Account Connector is a Cloudformation template, a AWS Lambda function and a DynamoDB table, which are used to connect/create cross account credentials from multiple AWS Accounts. The repository includes 3 subdirectories:

- `app` - NextJs application, which is the Managed Portal. It can be used to list the S3 buckets in the customer account. It uses the Cross Account Connector to retrieve the cross account credentials and list the S3 buckets in the customer account.
- `service` - Additional AWS Lambda functions for services, e.g. `cross-account-connector` for the custom CloudFormation resource, which is invoked during the CloudFormation stack creation (in customer account). It stores the cross account credentials in the DynamoDB table.
- `infrastructure` - The CDK project, to create the whole infrastructure, see more details in [Infrastructure](#infrastructure) section.

## User-Auth

Create a Clerk account and then create a Clerk app, within the create app go to organizations settings and enable the organizations

## User Journey

1. User signs in to the S3 Manager using email, github, microsoft or google account.
2. User creates a Workspace. A Workspace can be used to connect to AWS Accounts
3. User "Connects AWS Account" and gets redirected to the AWS Console.
4. The user creates a CloudFormation stack in the customer account, which includes the custom CloudFormation resource. The cloudformation stack creates
   1. a IAM role based on the provided information (role name, policy, etc.)
   2. Invokes the custom CloudFormation resource, which stores the cross account credentials in the DynamoDB table.
5. Managed Portal can now be used to query the DynamoDB table and retrieve the cross account credentials to list the resources in the customer account.

## Development

1. To develop the Managed Portal locally, you need to install the dependencies and start the development server.

```bash
cd app && pnpm install
```

2. create `local.env` file in `app` directory and add the environment variables. You can use the [.env](./app/.env) file as a template.

3. Start the development server

```bash
pnpm dev
```

## Infrastructure

The CDK project creates the following infrastructure:

1. `ManagedPortalStack` - The Managed Portal, which is a NextJS application using SST `NextjsSite`
2. `CrossAccountConnectorStack` - The Resources for the Cross Account Connector
   1. public S3 bucket - used to store the CloudFormation template
   2. DynamoDB table - used to store the cross account credentials
   3. AWS Lambda function - as custom CloudFormation resource, which stores the cross account credentials in the DynamoDB table
   4. Generate & Upload CloudFormation template - the CDK project generates the CloudFormation template dynamically and uploads it to the S3 bucket

Output:

- DynamoDB table name - used by the Managed Portal to query the table
- S3 uri - used by the Managed Portal to download the CloudFormation template

### Deploy Infrastucture

```bash
cd infrastructure && cdk deploy --profile <profile>
```

### After Deployment

The CDK project creates/outputs important information, which is needed for the Managed Portal to work properly. You need to add the environment variables to the Managed Portal, so it can query the DynamoDB table. Those variables can be set in [.env](../../app/.env) file.
