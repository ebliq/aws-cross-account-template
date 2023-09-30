import { type ClassValue, clsx } from "clsx"
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentOrgPath(path: string): string {
  const regexMatch = path.match(/\/workspace\/(\w+)/);
  if (regexMatch) {
    return regexMatch[1];
  }
  return "";
}