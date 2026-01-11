export function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      {/* Poster Skeleton */}
      <div className="aspect-2/3 w-full rounded-xl bg-gray-700/50" />

      {/* Title Skeleton */}
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-700/50" />

      {/* Metadata Skeleton */}
      <div className="mt-1 flex items-center justify-between">
        <div className="h-3 w-1/4 rounded bg-gray-700/50" />
        <div className="h-3 w-10 rounded bg-gray-700/50" />
      </div>
    </div>
  );
}
