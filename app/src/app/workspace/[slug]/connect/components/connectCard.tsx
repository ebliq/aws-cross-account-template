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
import { usePathname } from "next/navigation";
import { Ref, useRef } from "react";
import React from "react";
import { ListItem } from "@/components/ui/listItem";
import { CLOUDOFMRATION_URL } from "@/constants";

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
  const currentOrg = getCurrentOrgPath(path);
  const regionRef: Ref<HTMLSpanElement> = useRef(null);
  const [region, setRegion] = React.useState(DEFAULT_REGION);

  const cloudformationParameter = new URLSearchParams({
    param_workspaceID: currentOrg,
    stackName: `${currentOrg}-cloudofmration-${nanoid(6)}`,
    templateURL: CLOUDOFMRATION_URL || "",
  });

  return (
    <div className="mx-auto mt-8 flex min-h-[60vh] w-full max-w-[50em] flex-col ">
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
            <ListItem>Deploys a CloudFormation stack to your account</ListItem>
            <ListItem>Creates an IAM Role for Cross Account</ListItem>
            <ListItem>Scans your AWS regions for S3 Buckets</ListItem>
          </ul>
        </div>
        <Select onValueChange={(e) => setRegion(e)} defaultValue={region}>
          <SelectTrigger>
            <SelectValue ref={regionRef} placeholder="Select your AWS region" />
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
    </div>
  );
}
