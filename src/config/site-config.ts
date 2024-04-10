import { BASE_URL } from "../next.constants.mjs";

export const siteConfig = {
  name: "Eternal Jukebox",
  description: "Eternal Jukebox",
  keyWords: ["Eternal Jukebox", "Music", "Spotify"],
  // favicon: "/static/images/favicons/favicon.png",
  accentColor: "#333",
  url: BASE_URL,
  openGraphImage: (title?: string) =>
    `${siteConfig.url}/api/og?${title ? "title=" + encodeURI(title) : ""}`,
  openGraphDimensions: {
    width: 800,
    height: 400,
  },
  locale: "en-DE",
  timezone: "Europe/Berlin",
  currency: "EUR",
  icon: {
    ico: `${BASE_URL}/favicon.ico`,
    shortcut_16x16: `${BASE_URL}/favicon-16x16.png`,
    shortcut_32x32: `${BASE_URL}/favicon-32x32.png`,
    apple: `${BASE_URL}/apple-touch-icon.png`,
  },
  manifest: `${BASE_URL}/site.webmanifest`,
  social: {
    github: "https://github.com/janbulling",
  },
  address: "89077 Ulm, BW, Deutschland",
};
