"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Icons } from "../icons";
import {
  cn,
  getCurrentOrgPath,
  setCookieForActiveOrganization,
} from "@/lib/utils";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

type Organization = {
  id: string;
  name: string;
  imageUrl: string;
};

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function OrganizationSwitcher({ className }: TeamSwitcherProps) {
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();
  const currentOrg = getCurrentOrgPath(path);
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a "
            className={cn(
              `w-[200px] justify-between ${!currentOrg && "hidden"}`,
              className,
            )}
          >
            {currentOrg}
            <Icons.chevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading="Workspaces">
                {user?.organizationMemberships?.map(({ organization }) => (
                  <CommandItem
                    key={organization.id}
                    onSelect={async () => {
                      await setCookieForActiveOrganization(
                        organization.slug as string,
                      );
                      router.push(`/workspace/${organization.slug}`);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {organization.name}
                    <Icons.check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentOrg === organization.slug
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      router.push("/workspace");
                      setOpen(false);
                    }}
                  >
                    <Icons.plusCircle className="mr-2 h-5 w-5" />
                    Create Workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
