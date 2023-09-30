import { HOST } from "@/constants";
import { type ClassValue, clsx } from "clsx"
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentOrgPath(path: string): string {
  const regexMatch = path.match(/\/workspace\/([^/]+)/);
  if (regexMatch) {
    return regexMatch[1];
  }
  return "";
}

export async function setCookieForActiveOrganization(slug: string) {
  await fetch(`${HOST}/api/workspace/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug })
  })
}