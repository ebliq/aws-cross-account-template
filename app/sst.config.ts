import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "s3-manager",
      region: "us-east-1",
      profile: "hf-sm"
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        path: "app",
        environment: {
          // NEXT_PUBLIC_HOST: "https://api.example.com",
          CLOUDOFMRATION_URL: "https://account-gateway-public-template-bucket-a413.s3.us-east-1.amazonaws.com/template.json"
        },
        memorySize: 512,
        permissions: ["dynamodb"],

      }
      );

      // here we cann add more services and infrastructure
      stack.addOutputs({
        SiteUrl: site.url,
      });

    });
  },
} satisfies SSTConfig;
