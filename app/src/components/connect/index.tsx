"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";

import Link from "next/link";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { currentUser, useUser } from "@clerk/nextjs";
import Image from "next/image";

const AVAILABLE_REGIONS = [
  {
    region: "eu-central-1",
    available: true,
  },
  {
    region: "us-east-1",
    available: false,
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

const CLOUDOFMRATION_URL =
  process.env.CLOUDOFMRATION_URL ||
  "https://accountgatewaystack-publicbucket838c4779-xblbwu7v0vzr.s3.eu-central-1.amazonaws.com/template.json";

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <svg
      className="mr-2 h-3 w-3 flex-shrink-0 text-green-500 dark:text-green-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
    {children}
  </li>
);

export async function ConnectCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const form = useForm({ mode: "onChange" });
  const { user } = useUser();
  console.log(user);
  function onSubmit(data: any) {
    const cloudformationParameter = new URLSearchParams({
      param_workspaceID: nanoid(10),
      stackName: "MyCompans",
      templateURL: CLOUDOFMRATION_URL,
    });
    const url = `https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=${data.region}#/stacks/create/review?${cloudformationParameter}`;
    // console.log(url);
    window.open(url, "_ blank");
    // router.push("/callback/connection")
  }

  return (
    <div className="mx-auto mt-8 flex min-h-[60vh] w-full max-w-[50em] flex-col ">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 bg-white p-4 shadow ">
        <div className="flex w-full items-center justify-center gap-4">
          <div className="rounded-md bg-slate-200">
            {user ? (
              <Image
                src={user?.imageUrl}
                alt={user.username || "user"}
                width={64}
                height={64}
                className=" h-12 w-12 rounded-md"
              />
            ) : (
              <Icons.user className="h-8 w-8" />
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

        <div className="flex flex-col gap-4 rounded-md  p-4">
          <ul>
            <ListItem>Deploys a CloudFormation stack to your account</ListItem>
            <ListItem>Creates an IAM Role for Cross Account</ListItem>
            <ListItem>Scans your AWS regions for S3 Buckets</ListItem>
          </ul>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-6"
          >
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your AWS region" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormDescription>
                    AWS region where you want your resources to be managed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isDirty}>
              <code> Connect AWS Account</code>
            </Button>
          </form>
        </Form>
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
