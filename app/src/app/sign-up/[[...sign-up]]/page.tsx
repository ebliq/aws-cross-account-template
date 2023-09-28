import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto mt-8 flex min-h-[60vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <SignUp />
    </div>
  );
}
