import { Searchbar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-result";
import { getAccessToken } from "@/lib/spotify/access-token";
import { searchTracks } from "@/lib/spotify/search";

type Params = {
  searchParams: { [key: string]: string | undefined };
};

export default async function SearchPage({ searchParams }: Params) {
  const searchQuery = searchParams["q"];
  const searchFor = (searchParams["for"] ?? "jukebox") as "jukebox" | "karaoke";

  let tracks = null;

  if (searchQuery) {
    const results = await searchTracks(searchQuery, {
      limit: 7,
    });

    tracks = results?.tracks.items;
  }

  return (
    <>
      <Searchbar initial={searchQuery} forType={searchFor} />

      {tracks ? (
        <SearchResults tracks={tracks} forType={searchFor} />
      ) : searchQuery ? (
        <div className='mt-8'>No results found!</div>
      ) : (
        <div className='mt-8'>Search a Song on Spotify!</div>
      )}
    </>
  );
}
