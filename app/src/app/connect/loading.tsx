export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="bg-primary h-2 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary col-span-2 h-2  rounded"></div>
            </div>
            <div className="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
