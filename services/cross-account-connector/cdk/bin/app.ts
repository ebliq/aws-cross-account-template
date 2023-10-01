#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CrossAccountConnectorStack } from '../lib/cross-account-connector-stack';
import { customAlphabet } from 'nanoid';

const app = new cdk.App();

const nanoid = customAlphabet("1234567890abcdef", 4)

new CrossAccountConnectorStack(app, 'AccountGatewayStack', {
  namePrefix: 'account-gateway',
  randomSufix: nanoid(),
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
