import { Karaoke } from "@/components/karaoke/karaoke";
import { siteConfig } from "@/config/site-config";
import { getAccessToken } from "@/lib/spotify/access-token";
import { getTrack } from "@/lib/spotify/track";
import { searchTrackInYoutube } from "@/lib/youtube/search";
import { Lyrics } from "@/types/lyrics";

type Props = {
  params: { id: string };
};

export default async function KaraokeTrack({ params }: Props) {
  const track = await getTrack(params.id);

  if (!track) throw Error("Track not found");

  const lyricsResp = await fetch(
    `https://api.textyl.co/api/lyrics?q=${track.artists[0].name} - ${track.name}`
  );

  const lyrics = (await lyricsResp.json()) as Array<Lyrics>;

  const youtubeId = await searchTrackInYoutube({
    track: track,
  });

  return (
    <>
      <h2 className='text-2xl font-bold'>
        Lyrics for <span className='text-primary'>{track.name}</span>
      </h2>

      <Karaoke
        lyrics={lyrics}
        audioUrl={`${siteConfig.url}/api/audio?id=${youtubeId}`}
      />
    </>
  );
}
