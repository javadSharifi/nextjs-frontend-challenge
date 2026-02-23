'use client';

import { useTranslations } from 'next-intl';
import { MODULES } from './_config/modules';
import ModuleCard from './_components/ModuleCard';
import ThemeSwitcher from './_components/ThemeSwitcher';

const HomeHeader = () => {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">{t('title')}</h1>
      <p className="max-w-2xl text-lg opacity-70">{t('subtitle')}</p>
    </div>
  );
};

const ModuleGrid = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {MODULES.map((module) => (
      <ModuleCard key={module.name} {...module} />
    ))}
  </div>
);

export default function Home() {
  return (
    <div className="bg-base-200 min-h-screen transition-colors duration-500">
      <header className="bg-base-100 border-base-content/5 sticky top-0 z-50 border-b shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-black tracking-tighter">
            NEXUS<span className="text-primary">GAMES</span>
          </span>
          <ThemeSwitcher />
        </div>
      </header>
      <main className="flex min-h-[calc(100-64px)] items-center justify-center py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col gap-12">
            <HomeHeader />
            <ModuleGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
