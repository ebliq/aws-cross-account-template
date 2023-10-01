import { LoadingSpinner } from "@/components/icons/loading";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <LoadingSpinner />
    </div>
  );
}
