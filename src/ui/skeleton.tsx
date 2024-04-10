import { cn } from "@/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "h-5 w-2/5 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-900",
        className
      )}
      {...props}
    ></div>
  );
}
