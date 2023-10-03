import { DEFAULT_REGION, DYNAMODB_CROSS_ACCOUNT_TABLE_NAME, HOST } from "@/constants";
import { DynamoDBClient, QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { CustomCredentials, defaultCredentials } from "./credentials";

type Account = {
  SK: string,
  PK: string,
  active: boolean,
  region: string,
  role: string
}

export async function queryActiveAccounts({ slug, client }: { slug: string, client?: DynamoDBDocumentClient }): Promise<Account | null> {
  const docClient = client || createDocClient()

  // get PK from GSIPK
  const getInputs: QueryCommandInput = {
    TableName: DYNAMODB_CROSS_ACCOUNT_TABLE_NAME,
    // IndexName: process.env.NEXT_AUTH_DYNAMODB_GSI_NAME,
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: slug },
      ":active": { BOOL: true }
    },
    FilterExpression: "active = :active",
  };

  const data = await docClient.send(new QueryCommand(getInputs));
  if (data.Items?.length == 1) {
    return unmarshall(data.Items[0]) as Account
  }
  return null
}



export function createDocClient(credentials?: CustomCredentials) {
  // Validate if credentials are passed else use default
  const _credentials = credentials || defaultCredentials()
  // Create DynamoDB client
  const client = new DynamoDBClient(_credentials);
  // Create DynamoDB Document client
  const docClient = DynamoDBDocumentClient.from(client);
  return docClient;
}
