'use client';

import { ThemeProvider } from 'next-themes';

export function AdvancedSelectProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" storageKey="advanced-select-theme">
      <div className="tw-isolated min-h-screen bg-white text-slate-900">
        {children}
      </div>
    </ThemeProvider>
  );
}
