import { Searchbar } from "@/components/search/search-bar";
import { Skeleton } from "@/ui/skeleton";

export default function LoadingSearchPage() {
  return (
    <>
      <Searchbar />
      <div className='mt-8 flex-col flex gap-2 w-full max-w-xl'>
        <Skeleton className='w-full h-[72px]' />
        <Skeleton className='w-full h-[72px]' />
        <Skeleton className='w-full h-[72px]' />
        <Skeleton className='w-full h-[72px]' />
      </div>
    </>
  );
}
