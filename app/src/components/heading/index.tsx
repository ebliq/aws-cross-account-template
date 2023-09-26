import Link from "next/link";

import { cn } from "@/lib/utils";

export function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <h2 className="text-lg font-semibold">
            S3 Manager <span className="font-light">for AWS</span>
          </h2>
        </Link>

        {/* <TeamSwitcher /> */}
        {/* <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
          <Link href="/examples/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Overview
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Customers
          </Link>
          <Link
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
          </Link>
        </nav> */}
        {/* <div className="ml-auto flex items-center space-x-4">
          <Search /> 
           <UserNav />
        </div> */}
      </div>
    </div>
  );
}
