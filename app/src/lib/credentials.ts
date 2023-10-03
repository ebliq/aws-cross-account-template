import { DEFAULT_REGION } from "@/constants"
import { AssumeRoleCommandOutput, STS } from "@aws-sdk/client-sts"
import { LRUCache } from "lru-cache/min"
import { createDocClient, queryActiveAccounts } from "./db"

export type CustomCredentials = AssumeRoleCommandOutput | {
  region: string,
  credentials: {
    accessKeyId: string,
    secretAccessKey: string,
    sessionToken?: string,
  }
}

//  *
//  * Assume role and return credentials or use default credentials provided by environment variables
//  */
export async function assumeRole(roleArn: string, externalId: string, region: string): Promise<CustomCredentials> {
  // Create STS client
  const sts = new STS({
    region: region,
  })

  // Assume role
  const roleCredentials = await sts.assumeRole({
    RoleArn: roleArn,
    RoleSessionName: `cross-account-${externalId}`,
    ExternalId: externalId,
    DurationSeconds: 60 * 60, // 1 hour
  })
  return {
    region: region,
    credentials: {
      accessKeyId: roleCredentials.Credentials?.AccessKeyId!,
      secretAccessKey: roleCredentials.Credentials?.SecretAccessKey!,
      sessionToken: roleCredentials.Credentials?.SessionToken,
    }
  };

}

export function defaultCredentials(): CustomCredentials {
  return {
    region: DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
  }

}

export class CredentialsCache {
  private cache = new LRUCache(
    {
      max: 15,
      ttl: 1000 * 60 * 5, // 5 minutes
    }
  )
  private generateDocClient = createDocClient()

  // Tries to get credentials from cache, if not found, tries to get from db and set in cache
  public async getCredentialsOrSet(slug: string) {
    // get credentials from cache
    let _credentials = this.get(slug) as CustomCredentials | undefined
    // if not found, get from db and set in cache
    if (!_credentials) {
      const data = await queryActiveAccounts({ slug, client: this.generateDocClient })
      // if not found, throw error
      if (!data) {
        throw new Error("User not found")
      }
      // create credentials
      const userCredentials = await assumeRole(data?.role, data?.PK, data?.region)
      // set in cache
      this.set(slug, userCredentials)
      _credentials = userCredentials
    }
    return _credentials
  }

  get(slug: string) {
    return this.cache.get(slug)
  }

  set(slug: string, credentials: CustomCredentials) {
    this.cache.set(slug, credentials)
  }
}