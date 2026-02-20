'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IScreenshotGalleryProps {
  screenshots: { id: number; image: string }[];
}

const ScreenshotGallery = ({ screenshots }: IScreenshotGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations('GameDetail');

  if (!screenshots || screenshots.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">{t('gallery')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {screenshots.slice(0, 4).map((shot, index) => (
          <div
            key={shot.id}
            className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={shot.image}
              alt={`Screenshot ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="text-white w-6 h-6 drop-shadow-md" />
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="relative h-[80vh] w-[90vw] max-w-7xl">
            <Image
              src={screenshots[currentIndex].image}
              alt="Fullscreen screenshot"
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {currentIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotGallery;
