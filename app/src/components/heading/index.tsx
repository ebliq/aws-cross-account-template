import Link from "next/link";

import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import OrganizationSwitcher from "../../app/organizations/components/switcher";

export async function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const user = await currentUser();
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <h2 className="text-lg font-semibold">
            S3 Manager <span className="font-light">for AWS</span>
          </h2>
        </Link>

        {/* <TeamSwitcher /> */}
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          <Link
            href="/organizations"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Organizations
          </Link>
          {/* <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Settings
          </Link> */}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {/* <Search />  */}

          {user ? (
            <>
              <OrganizationSwitcher />
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
