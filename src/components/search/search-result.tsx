import { Track } from "@/types/spotify";
import { Link } from "@/ui/link";

type Props = {
  tracks: Track[];
  forType: "jukebox" | "karaoke";
};

export function SearchResults({ tracks, forType = "karaoke" }: Props) {
  return (
    <div className='mt-8 flex-col flex gap-2 w-full max-w-xl'>
      {tracks.map((t) => (
        <Link
          key={t.id}
          href={`/${forType}/${t.id}`}
          className='flex gap-2 hover:bg-gray-200 hover:dark:bg-gray-900 px-6 py-1 rounded-md'
        >
          <img src={t.album.images[0].url} className='size-16 rounded' />
          <div>
            <strong className='line-clamp-2'>{t.name}</strong>
            <p className='text-sm dark:text-gray-500 line-clamp-1'>
              {t.artists.map((a) => a.name).join(",")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
