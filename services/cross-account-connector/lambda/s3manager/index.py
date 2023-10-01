import json
import boto3
import boto3.session
import os

client = boto3.client("sts")
dynamodb = boto3.resource("dynamodb")
table_env = os.getenv("table", default=None)
if table_env == None:
    raise Exception("env table not set")

table = dynamodb.Table(table_env)


def getSession(RoleArn, ExternalId):
    response = client.assume_role(
        RoleArn=RoleArn,
        RoleSessionName="externalSession",
        ExternalId=ExternalId,
    )
    credentials = response["Credentials"]
    aws_access_key_id = credentials["AccessKeyId"]
    aws_secret_access_key = credentials["SecretAccessKey"]
    aws_session_token = credentials["SessionToken"]
    my_session = boto3.session.Session(
        aws_access_key_id,
        aws_secret_access_key,
        aws_session_token,
        region_name="eu-central-1",
    )
    return my_session


def handler(event, context):
    body = json.loads(event["body"])

    item = table.get_item(
        Key={"PK": body["workspace_id"], "SK": body["account_id"]},
    )

    role = item["Item"]["role"]
    workspace_id = item["Item"]["PK"]

    session = getSession(role, workspace_id)

    s3 = session.client("s3")

    body_result = json.dumps(
        s3.list_buckets()["Buckets"], indent=4, sort_keys=True, default=str
    )

    return {
        "StatusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": body_result,
    }


handler({"body": '{"workspace_id": "abc", "account_id": "403039540759"}'}, None)
