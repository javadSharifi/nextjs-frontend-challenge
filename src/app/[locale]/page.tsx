'use client';

import { useTranslations } from 'next-intl';
import HomeHeader from './_components/HomeHeader';
import ModuleGrid from './_components/ModuleGrid';
import ThemeSwitcher from './_components/ThemeSwitcher';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="bg-base-200 min-h-screen transition-colors duration-500">
      <header className="bg-base-100 border-base-content/5 sticky top-0 z-50 border-b shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-black tracking-tighter">
            {t('test')} <span className="text-primary">{t('compony')}</span>
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
