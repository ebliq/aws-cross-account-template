"use client";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();
  return (
    <SignOutButton signOutCallback={() => router.push("/")}>
      <Button>Logut</Button>
    </SignOutButton>
  );
}
