'use client';

import { useTranslations } from 'next-intl';
import { MODULES } from './_config/modules';
import ModuleCard from './_components/ModuleCard';

const HomeHeader = () => {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
        {t('title')}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        {t('subtitle')}
      </p>
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
    <main className="flex min-h-screen items-center justify-center bg-gray-50 py-20 dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col gap-12">
          <HomeHeader />
          <ModuleGrid />
        </div>
      </div>
    </main>
  );
}
