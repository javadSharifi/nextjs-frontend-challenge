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
      {game.background_image && (
        <Image src={game.background_image} alt={game.name} fill className="object-cover" priority />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="from-bg-base absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:justify-center">
        <div className="bg-primary mb-3 inline-flex max-w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white uppercase">
          {t('hero.newRelease')}
        </div>
        <h1 className="font-display glow-text mb-2 max-w-lg text-3xl font-bold text-white md:text-5xl">
          {game.name}
        </h1>
        {game.description_raw && (
          <p className="text-text-secondary mb-6 line-clamp-2 max-w-md text-sm">
            {game.description_raw}
          </p>
        )}
        <div className="flex gap-3">
          <Link
            href={`/games/${game.slug}`}
            className="bg-primary hover:bg-primary-hover neon-border flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors"
          >
            <Play size={16} fill="white" />
            {t('hero.playNow')}
          </Link>
          <Link
            href={`/games/${game.slug}`}
            className="glass-card hover:border-border-accent flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all"
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
