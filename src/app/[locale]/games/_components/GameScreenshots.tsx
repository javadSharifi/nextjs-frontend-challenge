'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IGameScreenshotsProps {
  screenshots: Array<{ id: number; image: string }>;
  gameName: string;
}

const GameScreenshots = ({ screenshots, gameName }: IGameScreenshotsProps) => {
  const t = useTranslations('game');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [selected]);

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
            className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-border-subtle hover:border-border-accent transition-all"
          >
            <Image src={s.image} alt={gameName} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-primary p-2 text-white hover:bg-primary-hover transition-colors"
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
          <img
            src={selected}
            alt="screenshot"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GameScreenshots;
