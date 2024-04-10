import "@/styles/globals.css";

import { Metadata } from "next";
import { cn } from "@/utils";
import { fontSans } from "@/ui/fonts";
import { TailwindIndicator } from "@/ui/tailwind-indicator";
import { siteConfig } from "@/config/site-config";
import { Toaster } from "@/ui/toast/toaster";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keyWords,
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Jan Bulling", url: "https://jan-bulling.com" }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      { url: siteConfig.openGraphImage(), ...siteConfig.openGraphDimensions },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
    description: siteConfig.description,
    images: [siteConfig.openGraphImage()],
    creator: "@greenengage",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: siteConfig.icon.ico,
    shortcut: [
      {
        url: siteConfig.icon.shortcut_32x32,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: siteConfig.icon.shortcut_16x16,
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [{ url: siteConfig.icon.apple, type: "image/png" }],
  },
  manifest: siteConfig.manifest,
};

// export function generateStaticParams() {
//   return availableLocales.map((locale) => ({ locale }));
// }

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang='en' className={cn("font-sans", fontSans.variable)}>
        <head>{/* <Analytics /> */}</head>
        <body
          suppressHydrationWarning
          className='h-full min-h-[100svh] antialiased'
        >
          <ThemeProvider>
            {children}
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
