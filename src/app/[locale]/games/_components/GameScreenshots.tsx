'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IGameScreenshotsProps {
  screenshots: Array<{ id: number; image: string }>;
  gameName: string;
}

const GameScreenshots = ({ screenshots, gameName }: IGameScreenshotsProps) => {
  const t = useTranslations('game');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="font-display mb-4 text-xl font-bold text-white">
        {t('detail.screenshots')}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {screenshots.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.image)}
            className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-[var(--color-border-subtle)] hover:border-[var(--color-border-accent)] transition-all"
          >
            <Image src={s.image} alt={gameName} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-[var(--color-primary)] p-2 text-white"
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
          <div className="relative h-auto w-full max-w-4xl aspect-video mx-4">
            <Image src={selected} alt="screenshot" fill className="object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreenshots;
