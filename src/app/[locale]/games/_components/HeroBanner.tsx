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
        <div className="badge badge-primary mb-3 font-bold uppercase">
          {t('hero.newRelease')}
        </div>
        <h1 className="mb-2 max-w-lg text-3xl font-bold text-white md:text-5xl drop-shadow-lg">
          {game.name}
        </h1>
        {game.description_raw && (
          <p className="mb-6 line-clamp-2 max-w-md text-sm text-white/70">
            {game.description_raw}
          </p>
        )}
        <div className="flex gap-3">
          <Link
            href={`/games/${game.slug}`}
            className="btn btn-primary btn-lg px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Play size={20} fill="currentColor" />
            {t('hero.playNow')}
          </Link>
          <Link
            href={`/games/${game.slug}`}
            className="btn btn-ghost btn-lg border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 px-8"
          >
            <Info size={20} />
            {t('hero.details')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
