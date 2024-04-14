import { Searchbar } from "@/components/search/search-bar";
import { db } from "@/lib/db/db";
import { spotifyIdToYoutubeIdTable } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

// export const dynamic = "auto";
// export const revalidate = 12 * 60 * 60;

export default function Jukebox() {
  // const [count] = await db
  //   .select({
  //     count: sql<number>`count(*)`,
  //   })
  //   .from(spotifyIdToYoutubeIdTable)
  //   .where(sql`${spotifyIdToYoutubeIdTable.createdAt}::date = CURRENT_DATE`);

  return (
    <>
      <h1 className='text-5xl font-semibold'>Karaoke</h1>
      {/* <p className='font-bold text-sm p-4'>Search: {count.count} / 99 today</p> */}
      <Searchbar className='mt-8' forType={"karaoke"} />
    </>
  );
}
