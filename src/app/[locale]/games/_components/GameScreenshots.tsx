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
    if (!selected) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
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

      {/* Lightbox overlay — full screen dark backdrop */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          {/* Close button */}
          <button className="absolute top-4 right-4 z-10 rounded-full bg-primary p-2 text-white">
            <X size={20} />
          </button>

          {/* Image container — constrained size, centered */}
          <div
            className="relative max-h-[85vh] max-w-[85vw] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected}
              alt="screenshot"
              className="max-h-[85vh] max-w-[85vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreenshots;
