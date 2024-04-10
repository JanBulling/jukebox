import { env } from "@/env.mjs";
import { revalidateTag, unstable_cache } from "next/cache";

export const getAccessToken = unstable_cache(
  getClientCredentials,
  ["spotify-access-token"],
  {
    tags: ["spotify-access-token"],
    revalidate: 3500, // 100 seconds before expiration of 1 hour
  }
);

export const refreshAccessToken = () => {
  revalidateTag("spotify-access-token");
  // return await getAccessToken();
};

async function getClientCredentials() {
  console.info("Requesting spotify access token");

  const authentication = Buffer.from(
    env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authentication}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const { access_token, token_type, expires_in } = await response.json();

  return access_token as string;
}
