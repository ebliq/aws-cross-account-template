import { DEFAULT_REGION, DYNAMODB_CROSS_ACCOUNT_TABLE_NAME, HOST } from "@/constants";
import { DynamoDBClient, QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


export async function queryActiveAccounts({ slug, client }: { slug: string, client?: DynamoDBDocumentClient }) {
  const docClient = client || createDocClient({})

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
    return data.Items[0]
  }
  return null
}


export function createDocClient({ }) {
  const client = new DynamoDBClient({
    region: DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,

    }
  });
  const docClient = DynamoDBDocumentClient.from(client);
  return docClient;
}
