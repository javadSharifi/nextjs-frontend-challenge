import Image from 'next/image';
import { Link } from '@/src/i18n/routing';
import { Play, Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { IGame } from '../_services/games.types';

interface IHeroBannerProps {
  game: IGame;
}

const HeroBanner = async ({ game }: IHeroBannerProps) => {
  const t = await getTranslations('game');

  return (
    <div className="relative h-80 overflow-hidden md:h-96 lg:h-[420px]">
      {/* Background Image */}
      {game.background_image && (
        <Image
          src={game.background_image}
          alt={game.name}
          fill
          className="object-cover"
          priority
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)] via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:justify-center">
        <div className="inline-flex max-w-fit mb-3 items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase text-white">
          {t('hero.newRelease')}
        </div>
        <h1 className="font-display mb-2 max-w-lg text-3xl font-bold text-white md:text-5xl glow-text">
          {game.name}
        </h1>
        {game.description_raw && (
          <p className="mb-6 max-w-md text-sm text-[var(--color-text-secondary)] line-clamp-2">
            {game.description_raw}
          </p>
        )}
        <div className="flex gap-3">
          <Link
            href={`/games/${game.slug}`}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--color-primary-hover)] transition-colors neon-border"
          >
            <Play size={16} fill="white" />
            {t('hero.playNow')}
          </Link>
          <Link
            href={`/games/${game.slug}`}
            className="flex items-center gap-2 rounded-lg glass-card px-5 py-2.5 text-sm font-bold text-white hover:border-[var(--color-border-accent)] transition-all"
          >
            <Info size={16} />
            {t('hero.details')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
