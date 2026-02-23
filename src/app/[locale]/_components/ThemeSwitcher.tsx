'use client';

import { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useThemeStore } from '@/src/store/themeStore';

const THEMES = [
  { id: 'nexus', name: 'Nexus (Dark Red)', type: 'dark' },
  { id: 'night', name: 'Night (Dark Blue)', type: 'dark' },
  { id: 'forest', name: 'Forest (Dark Green)', type: 'dark' },
  { id: 'black', name: 'Luxury (Pure Black)', type: 'dark' },
  { id: 'light', name: 'Light (Modern)', type: 'light' },
  { id: 'cupcake', name: 'Cupcake (Soft)', type: 'light' },
  { id: 'retro', name: 'Retro (Classic)', type: 'light' },
  { id: 'valentine', name: 'Valentine (Pink)', type: 'light' },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply theme on mount from store
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!mounted) {
    return (
      <div className="btn btn-ghost btn-sm gap-2">
        <Palette size={16} />
        <span className="hidden md:inline">تم</span>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2 hover:bg-primary/10 transition-colors">
        <Palette size={16} className="text-primary" />
        <span className="hidden md:inline font-bold">تم</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100/90 rounded-box z-50 w-64 p-2 shadow-2xl border border-white/5 backdrop-blur-2xl mt-4 grid grid-cols-1 gap-1">
        <div className="px-3 py-2 text-xs font-bold opacity-50 uppercase tracking-wider">انتخاب استایل</div>
        {THEMES.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => setTheme(t.id)}
              className={`flex items-center justify-between py-3 ${theme === t.id ? 'bg-primary/20 text-primary font-bold' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full border border-white/10`} data-theme={t.id} style={{ backgroundColor: 'var(--p)' }} />
                <span>{t.name}</span>
              </div>
              {theme === t.id && <Check size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
