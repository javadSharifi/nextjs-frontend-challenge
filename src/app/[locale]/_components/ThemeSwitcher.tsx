'use client';
import { Palette, Check, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { THEMES } from '../_config/themes';
import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';

const useIsMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const t = useTranslations('ThemeSwitcher');

  if (!mounted)
    return (
      <div className="btn btn-ghost btn-sm opacity-0" aria-hidden="true">
        <Palette size={16} />
      </div>
    );

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        aria-label="Select Theme"
        className="btn btn-ghost btn-sm hover:bg-primary/10 hover:border-primary/20 group gap-2 border border-transparent transition-all duration-300"
      >
        <div className="relative">
          <Palette size={18} className="text-primary transition-transform group-hover:rotate-12" />
          <Sparkles size={8} className="text-accent absolute -top-1 -right-1 animate-pulse" />
        </div>
        <span className="hidden font-bold tracking-wide md:inline">{t('themes')}</span>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100/95 z-99 mt-4 w-80 rounded-3xl border border-white/10 p-4 shadow-2xl backdrop-blur-2xl"
      >
        <div className="mb-4 flex items-center justify-between px-2">
          <span className="flex items-center gap-2 text-sm font-black tracking-widest uppercase opacity-70">
            <Sparkles size={14} className="text-primary" />
            {t('personalization')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((themeItem) => (
            <button
              key={themeItem.id}
              onClick={() => setTheme(themeItem.id)}
              aria-pressed={theme === themeItem.id}
              className={`group relative flex flex-col items-start overflow-hidden rounded-2xl p-3 transition-all duration-300 ${
                theme === themeItem.id
                  ? 'bg-primary text-primary-content shadow-primary/20 ring-primary ring-offset-base-100 shadow-lg ring-2 ring-offset-2'
                  : 'bg-base-200 hover:bg-base-300 text-base-content hover:scale-[1.02]'
              }`}
            >
              <div className="mb-3 flex w-full items-center justify-between">
                <span className="truncate text-xs font-bold">{themeItem.name}</span>
                {themeItem.type === 'dark' ? (
                  <Moon size={10} className="opacity-50" />
                ) : (
                  <Sun size={10} className="opacity-50" />
                )}
              </div>
              <div className="flex w-full gap-1">
                {themeItem.colors.map((c, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${c} border border-white/10`}
                  />
                ))}
              </div>
              {theme === themeItem.id && (
                <div className="absolute top-1 right-1">
                  <Check size={12} className="text-primary-content" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
