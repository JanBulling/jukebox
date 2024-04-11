import { Track } from "@/types/spotify";
import { YoutubeResult, YoutubeVideo } from "@/types/youtube";
import { spotifyIdToYoutubeIdTable } from "../db/schema";
import { db } from "../db/db";
import { and, eq, or } from "drizzle-orm";
import { parseDuration } from "@/utils/time-utils";
import { env } from "process";
import youtubeConfig from "@/config/youtube-config";

type Props = {
  track: Track;
};

export async function searchYoutube(q: string, maxResults = 5) {
  const url = `${youtubeConfig.baseUrl}/search?part=id&q=${q}&maxResults=${maxResults}&type=video&key=${env.YOUTUBE_API_KEY}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:44.0) Gecko/20100101 Firefox/44.0",
    },
  });

  if (!response.ok) return null;
  const data = await response.json();

  const ids = (data as YoutubeResult).items.map((i) => i.id.videoId);

  return ids;
}

export async function getVideoDetails(id: string | string[] | null) {
  if (!id) return null;
  const ids = typeof id === "string" ? id : id.join(",");

  const url = `${youtubeConfig.baseUrl}/videos?part=contentDetails&id=${ids}&key=${env.YOUTUBE_API_KEY}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:44.0) Gecko/20100101 Firefox/44.0",
    },
  });

  if (!response.ok) return null;
  const data = await response.json();

  return data.items as YoutubeVideo[];
}

export async function searchTrackInYoutube({ track }: Props) {
  const artists = track.artists.map((a) => a.name);

  // firstly check in db for the id (the cost of searching youtube is very large)
  const [dbResult] = await db
    .select()
    .from(spotifyIdToYoutubeIdTable)
    .where(
      or(
        eq(spotifyIdToYoutubeIdTable.spotifyId, track.id)
        // and(
        //   eq(spotifyIdToYoutubeIdTable.songName, track.name),
        //   eq(spotifyIdToYoutubeIdTable.artists, artists.join(", "))
        // )
      )
    );

  if (dbResult) return dbResult.youtubeId;

  const trackDuration = track.duration_ms / 1000;
  const firstArtist = artists[0];

  const songSearchQ = `${firstArtist} - ${track.name}`;
  // const lyricsSearchQ = `${firstArtist} - ${track.name} lyrics`;

  const results1 = await searchYoutube(songSearchQ, 10);
  const details1 = await getVideoDetails(results1);

  //const results2 = await searchYoutube(lyricsSearchQ);
  //const details2 = await getVideoDetails(results2);

  //let results = (details1 ?? []).concat(details2 ?? []);
  const results = details1 ?? [];
  if (results.length === 0) return null;

  const closestResult = results.reduce((prev, curr) =>
    Math.abs(
      (parseDuration(curr.contentDetails.duration) ?? 0) - trackDuration
    ) <
    Math.abs((parseDuration(prev.contentDetails.duration) ?? 0) - trackDuration)
      ? curr
      : prev
  );

  await db.insert(spotifyIdToYoutubeIdTable).values({
    spotifyId: track.id,
    youtubeId: closestResult.id,
    songName: track.name,
    artists: artists.join(", "),
  });

  return closestResult.id;
}
