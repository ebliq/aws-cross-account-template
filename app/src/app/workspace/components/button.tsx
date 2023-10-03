"use client";
import { Button } from "@/components/ui/button";

async function listBuckets() {
  const c = await fetch("http://localhost:3000/api/s3/list/philipp-aws", {
    method: "GET",
    credentials: "include",
  });
  console.log(c.status);
  return [];
}

export function TestButton() {
  return <Button onClick={listBuckets}>test</Button>;
}
