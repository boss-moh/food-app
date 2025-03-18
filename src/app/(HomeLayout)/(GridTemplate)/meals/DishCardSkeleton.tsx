export const DishCardSkeleton = () => {
  return (
    <div className="p-4  border border-gray-200 rounded-md shadow-sm">
      {/* Image Skeleton */}
      <div className="h-40 w-full bg-gray-200 animate-pulse rounded" />

      {/* Title & Price Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Description Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
        <div className="h-3 w-5/6 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Metadata (category & time) Skeleton */}
      <div className="mt-4 flex items-center space-x-2">
        <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
        <div className="h-3 w-10 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Buttons Skeleton */}
      <div className="mt-4 flex space-x-2">
        <div className="h-10  w-3/4 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-1/4 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  );
};

export default DishCardSkeleton;
