import spotifyConfig from "@/config/spotify-config";
import { getAccessToken, refreshAccessToken } from "./access-token";
import { Track } from "@/types/spotify";

export async function getTrack(trackId: string) {
  const accessToken = await getAccessToken();

  const requestUrl = `${spotifyConfig.baseUrl}/tracks/${trackId}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;

  if (status === 401) {
    refreshAccessToken();
    return await getTrack(trackId);
  } else if (status === 200) {
    const data = await response.json();
    return data as Track;
  }

  return null;
}
