'use client';

import { ThemeProvider } from 'next-themes';

export function GamesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="nexus" storageKey="theme-storage">
      <div className="tw-isolated min-h-screen bg-base-200 text-base-content">
        {children}
      </div>
    </ThemeProvider>
  );
}
