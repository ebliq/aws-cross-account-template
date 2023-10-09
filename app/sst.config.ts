import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

[
  "AWS_DEFAULT_REGION",
  "AWS_PROFILE",
  "CLERK_SECRET_KEY",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_CLOUDOFMRATION_URL",
  "NEXT_PUBLIC_HOST",
].forEach((item) => {
  if (!process.env[item]) {
    throw new Error(`set ${item} as env-var`);
  }
});

export default {
  config(_input) {
    return {
      name: "s3-manager",
      region: process.env["AWS_DEFAULT_REGION"],
      profile: process.env["AWS_PROFILE"],
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        path: ".",
        environment: {
          NEXT_PUBLIC_HOST: process.env["NEXT_PUBLIC_HOST"]!,
          NEXT_PUBLIC_CLOUDOFMRATION_URL:
            process.env["NEXT_PUBLIC_CLOUDOFMRATION_URL"]!,
          NEXT_PUBLIC_DEFAULT_REGION: process.env["AWS_DEFAULT_REGION"]!,
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
            process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"]!,
          NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
          NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/sign-up",
          NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/",
          NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: "/",
          DYNAMODB_CROSS_ACCOUNT_TABLE_NAME: "account-gateway-user-table-0c0f",
          CLERK_SECRET_KEY: process.env["CLERK_SECRET_KEY"]!,
        },
        memorySize: 512,
        permissions: ["dynamodb"],
      });

      // here we cann add more services and infrastructure
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
