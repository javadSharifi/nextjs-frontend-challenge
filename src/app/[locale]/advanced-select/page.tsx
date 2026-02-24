'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { groupedData, largeDataset, fruitsData } from './_data/mockData';
import ThemeSwitcher from '../_components/ThemeSwitcher';
import { AdvancedSelect } from './_components/advanced-select';

export default function AdvancedSelectPage() {
  const t = useTranslations('AdvancedSelect');
  const [multiValue, setMultiValue] = useState<string[]>(['apple', 'carrot']);
  const [singleValue, setSingleValue] = useState<string[]>([]);
  const [largeValue, setLargeValue] = useState<string[]>([]);

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <h1 className="px-4 text-xl font-bold">{t('title')}</h1>
        </div>
        <div className="flex-none">
          <ThemeSwitcher />
        </div>
      </div>

      <div className="container mx-auto max-w-3xl space-y-8 p-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t('multiSelectWithGroups')}</h2>
            <AdvancedSelect
              label={t('chooseFavorites')}
              options={groupedData}
              value={multiValue}
              onChange={setMultiValue}
              placeholder={t('selectFruitsAndVegetables')}
              searchable
              multiple
              selectAll
              virtualized={false}
            />
            <div className="mt-4">
              <code className="badge badge-neutral">{JSON.stringify(multiValue)}</code>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t('singleSelect')}</h2>
            <AdvancedSelect
              label={t('chooseOne')}
              options={fruitsData}
              value={singleValue}
              onChange={setSingleValue}
              placeholder={t('selectFruit')}
              searchable
              multiple={false}
            />
            <div className="mt-4">
              <code className="badge badge-neutral">{JSON.stringify(singleValue)}</code>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t('virtualizedList')}</h2>
            <p className="text-base-content/60 text-sm">{t('virtualizedDescription')}</p>
            <AdvancedSelect
              label={t('selectFromLargeDataset')}
              options={largeDataset}
              value={largeValue}
              onChange={setLargeValue}
              placeholder={t('search1000Items')}
              searchable
              multiple
              selectAll
              virtualized
              virtualHeight={320}
            />
            <div className="mt-4">
              <code className="badge badge-neutral">
                {t('selected')}: {largeValue.length} {t('items')}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
