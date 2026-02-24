'use client';

import { useTranslations } from 'next-intl';

export default function HomeHeader() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">{t('title')}</h1>
      <p className="max-w-2xl text-lg opacity-70">{t('subtitle')}</p>
    </div>
  );
}
