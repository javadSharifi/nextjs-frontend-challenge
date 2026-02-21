'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

interface IGameScreenshotsProps {
  screenshots: Array<{ id: number; image: string }>;
  gameName: string;
}

const ScreenshotModal = ({
  screenshots,
  gameName,
  index,
  onClose,
  onNext,
  onPrev,
  onSelect,
}: {
  screenshots: Array<{ id: number; image: string }>;
  gameName: string;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (i: number) => void;
}) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-bg-elevated relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-text-muted text-sm">
            {index + 1} / {screenshots.length}
          </span>
          <button
            onClick={onClose}
            className="text-text-muted rounded-lg p-1.5 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <Image
            src={screenshots[index].image}
            alt={`${gameName} ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>

        {screenshots.length > 1 && (
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
            <button
              onClick={onPrev}
              className="text-text-secondary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft size={16} />
              قبلی
            </button>

            <div className="flex gap-1.5">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'bg-primary w-4' : 'w-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              className="text-text-secondary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              بعدی
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

const GameScreenshots = ({ screenshots, gameName }: IGameScreenshotsProps) => {
  const t = useTranslations('game');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isOpen = selectedIndex !== null;

  const goNext = useCallback(
    () => setSelectedIndex((i) => (i !== null ? (i + 1) % screenshots.length : null)),
    [screenshots.length],
  );

  const goPrev = useCallback(
    () =>
      setSelectedIndex((i) =>
        i !== null ? (i - 1 + screenshots.length) % screenshots.length : null,
      ),
    [screenshots.length],
  );

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, goNext, goPrev]);

  return (
    <>
      <div className="glass-card rounded-xl p-6">
        <h2 className="font-display mb-4 text-xl font-bold text-white">
          {t('detail.screenshots')}
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {screenshots.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className="border-border-subtle hover:border-primary relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 hover:scale-105"
            >
              <Image
                src={s.image}
                alt={`${gameName} ${i + 1}`}
                fill
                className="pointer-events-none object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {isOpen && selectedIndex !== null && (
        <ScreenshotModal
          screenshots={screenshots}
          gameName={gameName}
          index={selectedIndex}
          onClose={close}
          onNext={goNext}
          onPrev={goPrev}
          onSelect={setSelectedIndex}
        />
      )}
    </>
  );
};

export default GameScreenshots;
