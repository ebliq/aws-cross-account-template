"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../components/ui/command";
import React, { useEffect } from "react";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { Icons } from "../../../components/icons";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const { user } = useUser();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const currentOrg = useOrganization();

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a "
            className={cn("w-[200px] justify-between", className)}
          >
            {currentOrg?.organization?.name}
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
                    onSelect={() => {
                      // @ts-ignore
                      setActive({ organization: organization.id });
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={organization.imageUrl}
                        alt={organization.name}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {organization.name}
                    <Icons.check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentOrg?.organization?.id === organization.id
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
                      router.push("/organizations/new");
                    }}
                  >
                    <Icons.plusCircle className="mr-2 h-5 w-5" />
                    Create Organization
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

// "use client";
// import { useOrganization, useOrganizationList } from "@clerk/nextjs";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// export function Organizations() {
//   const form = useForm();
//   const { createOrganization } = useOrganizationList();
//   const { isLoaded, setActive, userMemberships } = useOrganizationList({
//     userMemberships: {
//       infinite: true,
//     },
//   });
//   console.log(userMemberships);

//   function onSubmit(data: any) {
//     createOrganization({ name: data.name });
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Organization Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="ebliq" {...field} />
//               </FormControl>
//               <FormDescription>This is your organization name</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Create organization</Button>
//       </form>
//     </Form>
//   );
// }
