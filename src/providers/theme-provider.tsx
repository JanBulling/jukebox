"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { FC, PropsWithChildren } from "react";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute='data-theme'
    defaultTheme='dark'
    storageKey='theme'
    enableSystem={false}
    // attribute='class'
    // defaultTheme='light'
    // enableSystem={false}
    // disableTransitionOnChange
  >
    {children}
  </NextThemeProvider>
);
