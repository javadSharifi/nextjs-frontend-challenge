'use client';

import { useTranslations } from 'next-intl';
import { MODULES } from './_config/modules';
import ModuleCard from './_components/ModuleCard';

const HomeHeader = () => {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">
        {t('title')}
      </h1>
      <p className="max-w-2xl text-lg opacity-70">
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
    <main className="flex min-h-screen items-center justify-center bg-base-200 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col gap-12">
          <HomeHeader />
          <ModuleGrid />
        </div>
      </div>
    </main>
  );
}
