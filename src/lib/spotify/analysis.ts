import spotifyConfig from "@/config/spotify-config";
import { getAccessToken, refreshAccessToken } from "./access-token";
import { TrackAnalysis } from "@/types/spotify";

export async function getTrackAnalysis(trackId: string, accessToken?: string) {
  const token = accessToken ? accessToken : await getAccessToken();

  const requestUrl = `${spotifyConfig.baseUrl}/audio-analysis/${trackId}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;

  if (status === 401) {
    const newAccessToken = await refreshAccessToken();
    return await getTrackAnalysis(trackId, newAccessToken);
  } else if (status === 200) {
    const data = await response.json();
    return data as TrackAnalysis;
  }

  return null;
}
