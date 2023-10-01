import cfnresponse
import boto3
import os

dynamodb = boto3.resource("dynamodb")
table_env = os.getenv("DYNAMODB_TABLE", None)
if table_env == None:
    raise ValueError("DYNAMODB_TABLE environment variable is not set.")

table = dynamodb.Table(table_env)


def handler(event, context):
    print(event)
    account_id = event["ResourceProperties"]["accountID"]
    role = event["ResourceProperties"]["role"]
    region = event["ResourceProperties"]["region"]
    workspace_id = event["ResourceProperties"]["workspaceID"]

    if event["RequestType"] == "Create":
        response = table.put_item(
            Item={
                "PK": workspace_id,
                "SK": account_id,
                "role": role,
                "region": region,
                "active": True,
            }
        )
    if event["RequestType"] == "Delete":
        response = table.put_item(
            Item={
                "PK": workspace_id,
                "SK": account_id,
                "role": role,
                "region": region,
                "active": False,
            }
        )

    resource_physical_id = f'{event["LogicalResourceId"]}-{workspace_id}'
    cfnresponse.send(event, context, cfnresponse.SUCCESS, {}, resource_physical_id)

    return 200


# event = {
#     "RequestType": "Delete",
#     "ServiceToken": "arn:aws:lambda:eu-central-1:457473946763:function:AccountGatewayStack-connectorlambda06286316-tRSbQA45HplA",
#     "ResponseURL": "https://cloudformation-custom-resource-response-eucentral1.s3.eu-central-1.amazonaws.com/arn%3Aaws%3Acloudformation%3Aeu-central-1%3A403039540759%3Astack/Connector/3da62c50-5bdb-11ee-bd9e-0a6af0a5bf3d%7CCOMPANYConnect%7Cace63480-d2d1-4781-84db-f3f508ce3263?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230925T193949Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIAYYGVRKE7OATMHJMA%2F20230925%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=a7aa5008dd5419967d152cdae4ca86e2e64d0c462f5c807cc27a7bf39d56b9c7",
#     "StackId": "arn:aws:cloudformation:eu-central-1:403039540759:stack/Connector/3da62c50-5bdb-11ee-bd9e-0a6af0a5bf3d",
#     "RequestId": "ace63480-d2d1-4781-84db-f3f508ce3263",
#     "LogicalResourceId": "COMPANYConnect",
#     "ResourceType": "Custom::COMPANYConnect",
#     "ResourceProperties": {
#         "ServiceToken": "arn:aws:lambda:eu-central-1:457473946763:function:AccountGatewayStack-connectorlambda06286316-tRSbQA45HplA",
#         "accountID": "403039540759",
#         "role": "arn:aws:iam::403039540759:role/COMPANY-du2nd2undu2nd2uen",
#         "region": "eu-central-1",
#         "workspaceID": "BLABLABLA",
#     },
# }

# handler(event, None)
