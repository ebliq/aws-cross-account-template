"use client";
import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <Button
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Logut
    </Button>
  );
}
