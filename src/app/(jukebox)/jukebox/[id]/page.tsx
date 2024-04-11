import { AudioPlayer } from "@/components/jukebox/audio-player";
import { siteConfig } from "@/config/site-config";
import { analysePreprocessedTrack } from "@/lib/analysis/analyse-track-beats";
import { preprocessTrack } from "@/lib/analysis/preprocess";
import { getAccessToken } from "@/lib/spotify/access-token";
import { getTrackAnalysis } from "@/lib/spotify/analysis";
import { getTrack } from "@/lib/spotify/track";
import { searchTrackInYoutube } from "@/lib/youtube/search";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
};

export default async function JukeboxTrack({ params }: Props) {
  const track = await getTrack(params.id);
  const analysis = await getTrackAnalysis(params.id);

  if (!track || !analysis) throw Error("Track not found");

  const youtubeId = await searchTrackInYoutube({
    track: track,
  });

  if (!youtubeId) throw Error("No youtube video found");

  const preporcessed = preprocessTrack(analysis);
  const analysisResult = analysePreprocessedTrack(preporcessed, 75);

  return (
    <>
      <h2 className='text-2xl font-bold'>
        Playing <span className='text-primary'>{track.name}</span>
      </h2>
      <h3 className='font-bold'>
        ({track.artists.map((a) => a.name).join(", ")})
      </h3>
      <p className='text-sm'>Album: {track.album.name}</p>
      <img
        src={track.album.images[0].url}
        width={250}
        height={250}
        className='w-48 h-48 mt-2'
      />

      <AudioPlayer
        trackAnalysis={analysisResult}
        trackDurationSec={track.duration_ms / 1000}
        audioUrl={`${siteConfig.url}/api/audio/${youtubeId}`}
        // audioUrl={`http://localhost:3000/api/audio?id=${youtubeId}`}
        className='mt-8'
      />
    </>
  );
}
