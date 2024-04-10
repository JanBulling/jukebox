import { Skeleton } from "@/ui/skeleton";

export default function KaraokeLoading() {
  return (
    <>
      <Skeleton className='h-8 w-32' />
      <Skeleton className='w-16 h-6 mt-1' />
      <Skeleton className='w-48 h-48 mt-6' />
    </>
  );
}
