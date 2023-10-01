"use client";

import { cn, getCurrentOrgPath } from "@/lib/utils";
import { Icons } from "@/components/icons";

import Link from "next/link";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import { ListItem } from "@/components/ui/listItem";
import { CLOUDOFMRATION_URL, DEFAULT_REGION, HOST } from "@/constants";
import { LoadingSpinner } from "@/components/icons/loading";

const AVAILABLE_REGIONS = [
  {
    region: "eu-central-1",
    available: true,
  },
  {
    region: "us-east-1",
    available: true,
  },
  {
    region: "us-west-2",
    available: false,
  },
  {
    region: "ap-southeast-1",
    available: false,
  },
];

interface ConnectCardProps extends React.HTMLAttributes<HTMLElement> {
  userId: string;
  userImage?: string;
}

export function ConnectCard({
  userId,
  userImage,
  className,
}: ConnectCardProps) {
  const path = usePathname();
  const router = useRouter();
  const currentOrg = getCurrentOrgPath(path);
  const [region, setRegion] = React.useState(DEFAULT_REGION);
  const [connecting, setConnecting] = React.useState(false);

  const cloudformationParameter = new URLSearchParams({
    param_workspaceID: currentOrg,
    stackName: `${currentOrg}-cloudofmration-${nanoid(6)}`,
    templateURL: CLOUDOFMRATION_URL || "",
  });

  // Checks if the account is connected after "connecting" is set to "true"
  // uses polling every 3 seconds if the account is connected redirects to the workspace
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!connecting) return;
      // check if account is connected
      const res = await fetch(`${HOST}/api/workspace/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: currentOrg }),
      });
      console.log(res.ok);
      if (res.ok) {
        router.push(`/workspace/${currentOrg}`);
      }
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connecting]);

  return (
    <div className="mx-auto mt-8 flex min-h-[60vh] w-full max-w-[50em] flex-col ">
      {!connecting ? (
        <div className="mx-auto flex flex-col items-center justify-center gap-4  p-4 ">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="rounded-md dark:bg-accent">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userId || "user"}
                  width={64}
                  height={64}
                  className=" h-12 w-12 rounded-md"
                />
              ) : (
                <div className="p-2 ">
                  <Icons.user className="h-8 w-8" />
                </div>
              )}
            </div>
            <Icons.arrowLeftRight className="h-4 w-4" />
            <div className="flex items-center justify-center rounded-md bg-slate-800 p-2">
              <Icons.aws className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Connect an AWS account</h1>
            <span className="text-sm text-muted-foreground">
              Let&apos;s connect an AWS account to your workspace
            </span>
          </div>
          <div className="flex flex-col gap-4 rounded-md border border-input bg-background p-4">
            <ul>
              <ListItem>
                Deploys a CloudFormation stack to your account
              </ListItem>
              <ListItem>Creates an IAM Role for Cross Account</ListItem>
              <ListItem>Scans your AWS regions for S3 Buckets</ListItem>
            </ul>
          </div>
          <Select onValueChange={(e) => setRegion(e)} defaultValue={region}>
            <SelectTrigger>
              <SelectValue placeholder="Select your AWS region" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_REGIONS.map((region) => (
                <SelectItem
                  key={region.region}
                  value={region.region}
                  disabled={!region.available}
                >
                  {region.region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">
            AWS region where you want your resources to be managed
          </span>

          <Button className="font-mono">
            <Link
              onClick={() => setConnecting(true)}
              href={`https://${region}.console.aws.amazon.com/cloudformation/home?region=${region}#/stacks/create/review?${cloudformationParameter}`}
              target="_blank"
            >
              Connect AWS Account
            </Link>
          </Button>
          <span className="text-xs text-muted-foreground">
            Want to know more check the{" "}
            <Link href={"/docs"} className="font-mono ">
              Documentation
            </Link>
          </span>
        </div>
      ) : (
        <div className="mx-auto flex w-96 flex-col items-center justify-center gap-8 p-4  text-center ">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">
              Waiting to connect to your AWS account…
            </h1>
            <span className="text-sm text-muted-foreground">
              Waiting for your stack to be created in <code>{region}</code> If
              something went wrong,{" "}
              <span className="cursor-pointer text-primary hover:underline ">
                retry again it here
              </span>
              .
            </span>
          </div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
