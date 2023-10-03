"use client";
import { Button } from "@/components/ui/button";
import { HOST } from "@/constants";

async function listBuckets() {
  const c = await fetch(`${HOST}/api/s3/list/philipp-aws`, {
    method: "GET",
    credentials: "include",
  });
  console.log(c.status);
  return [];
}

export function TestButton() {
  return <Button onClick={listBuckets}>List buckets via api</Button>;
}
