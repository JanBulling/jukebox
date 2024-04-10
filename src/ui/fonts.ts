import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  EB_Garamond as FontEB_Garamond,
} from "next/font/google";
// import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// export const fontSansLocal = localFont({
//   src: "../styles/fonts/Inter-Variable.ttf",
//   variable: "--font-sans",
// });

export const fontEB_Garamond = FontEB_Garamond({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-eb-garamond",
});
