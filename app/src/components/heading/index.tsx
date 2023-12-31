import Link from "next/link";

import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import OrganizationSwitcher from "./switcher";
import { ModeToggle } from "../theme-provider";
import { SignOut } from "./signout";

export async function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const user = await currentUser();

  return (
    <div className="flex h-16 items-center border-b px-4 dark:border-accent">
      <Link href="/">
        <h2 className="text-lg font-semibold">
          S3 Manager <span className="font-light">for AWS</span>
        </h2>
      </Link>

      <div className="ml-auto flex items-center space-x-4">
        {/* <Search />  */}
        <ModeToggle />
        {user ? (
          <>
            <OrganizationSwitcher />
            <SignOut />
          </>
        ) : (
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
