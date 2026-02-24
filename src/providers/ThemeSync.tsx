'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { THEMES } from '@/src/app/[locale]/_config/themes';

export function ThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme || resolvedTheme;
    const themeConfig = THEMES.find((t) => t.id === currentTheme);
    const type = themeConfig ? themeConfig.type : (resolvedTheme === 'dark' ? 'dark' : 'light');

    if (type === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme, resolvedTheme]);

  return null;
}
