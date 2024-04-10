import spotifyConfig from "@/config/spotify-config";
import { TrachSearchResult } from "@/types/spotify";
import { getAccessToken, refreshAccessToken } from "./access-token";

type OptionsProps = {
  type?: ("track" | "album" | "artist")[];
  limit?: number;
  offset?: number;
};

export async function searchTracks(
  q: string,
  options: OptionsProps = {
    type: ["track"],
    limit: 10,
    offset: 0,
  }
) {
  const accessToken = await getAccessToken();

  const urlParameters = new URLSearchParams({
    q: q,
    type: options.type?.join(",") ?? "track",
    limit: options.limit?.toString() ?? "10",
    offset: options.offset?.toString() ?? "0",
  }).toString();

  const requestUrl = `${spotifyConfig.baseUrl}/search?${urlParameters}`;

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
    return await searchTracks(q, options);
  } else if (status === 200) {
    const data = await response.json();
    return data as TrachSearchResult;
  }

  return null;
}
