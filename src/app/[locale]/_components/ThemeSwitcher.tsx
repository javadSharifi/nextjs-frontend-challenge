'use client';

import { useEffect, useState } from 'react';
import { Palette, Check, Sparkles, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/src/store/themeStore';

const THEMES = [
  { id: 'nexus', name: 'Nexus', type: 'dark', colors: ['bg-[#e63743]', 'bg-[#1a0f0f]', 'bg-[#0a0a0a]'] },
  { id: 'night', name: 'Night', type: 'dark', colors: ['bg-[#38bdf8]', 'bg-[#1e293b]', 'bg-[#0f172a]'] },
  { id: 'forest', name: 'Forest', type: 'dark', colors: ['bg-[#1eb854]', 'bg-[#171212]', 'bg-[#171212]'] },
  { id: 'black', name: 'Luxury', type: 'dark', colors: ['bg-[#343232]', 'bg-[#1a1a1a]', 'bg-[#000000]'] },
  { id: 'light', name: 'Light', type: 'light', colors: ['bg-[#570df8]', 'bg-[#f000b8]', 'bg-[#ffffff]'] },
  { id: 'cupcake', name: 'Cupcake', type: 'light', colors: ['bg-[#65c3c8]', 'bg-[#ef9fbc]', 'bg-[#faf7f5]'] },
  { id: 'retro', name: 'Retro', type: 'light', colors: ['bg-[#ef9995]', 'bg-[#a4cbb4]', 'bg-[#ece3ca]'] },
  { id: 'valentine', name: 'Valentine', type: 'light', colors: ['bg-[#e96d7b]', 'bg-[#a991f7]', 'bg-[#fff1f2]'] },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm gap-2 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 group"
      >
        <div className="relative">
          <Palette size={18} className="text-primary group-hover:rotate-12 transition-transform" />
          <Sparkles size={8} className="absolute -top-1 -right-1 text-accent animate-pulse" />
        </div>
        <span className="hidden md:inline font-bold tracking-wide">تم‌ها</span>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content menu p-4 shadow-2xl bg-base-100/95 backdrop-blur-2xl rounded-3xl w-80 mt-4 border border-white/10 z-[100]"
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            شخصی‌سازی
          </span>
          <div className="badge badge-primary badge-outline font-bold text-[10px]">DAISY UI 5</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`
                group flex flex-col items-start p-3 rounded-2xl transition-all duration-300 relative overflow-hidden
                ${theme === t.id
                  ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-base-100'
                  : 'bg-base-200 hover:bg-base-300 text-base-content hover:scale-[1.02]'
                }
              `}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-bold truncate">{t.name}</span>
                {t.type === 'dark' ? <Moon size={10} className="opacity-50" /> : <Sun size={10} className="opacity-50" />}
              </div>

              <div className="flex gap-1 w-full">
                {t.colors.map((c, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${c} border border-white/10`} />
                ))}
              </div>

              {theme === t.id && (
                <div className="absolute top-1 right-1">
                  <Check size={12} className="text-primary-content" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center">
          <p className="text-[10px] opacity-40 font-medium italic text-center">
            تغییرات به صورت خودکار ذخیره می‌شوند
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
