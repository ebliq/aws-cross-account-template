import { CustomCredentials } from "../credentials";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";


interface S3ClientConfig {
  credentials: CustomCredentials;
}

export async function listBuckets({ credentials }: S3ClientConfig) {
  // Create S3 client with credentials, takes ~1-10ms
  const s3 = new S3Client({ region: credentials.region, credentials: credentials.credentials });

  // List buckets
  const response = await s3.send(new ListBucketsCommand({}));

  // check if buckets exist else 
  if (response.Buckets?.length == 0) {
    console.error(`No buckets found for ${credentials.credentials.accessKeyId}`)
    return undefined;
  }
  return response.Buckets
}