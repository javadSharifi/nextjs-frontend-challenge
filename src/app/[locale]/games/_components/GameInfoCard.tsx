import { Clock, Globe, Tag } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { IGame } from '../_services/games.types';

interface IGameInfoCardProps {
  game: IGame;
}

const GameInfoCard = async ({ game }: IGameInfoCardProps) => {
  const t = await getTranslations('game');

  const infoRows = [
    {
      label: t('detail.info.playtime'),
      value: game.playtime ? `${game.playtime}h avg` : '-',
      icon: Clock,
    },
    { label: t('detail.info.esrb'), value: game.esrb_rating?.name || 'Not Rated', icon: Tag },
  ];

  return (
    <div className="card bg-base-100/50 border border-white/5 p-5 shadow-xl space-y-4">
      <h3 className="card-title text-base font-bold">{t('detail.info.title')}</h3>

      <div className="space-y-3">
        {infoRows.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0"
          >
            <div className="flex items-center gap-2 text-sm opacity-70">
              <Icon size={14} className="text-primary" />
              {label}
            </div>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>

      {game.tags && game.tags.length > 0 && (
        <div>
          <p className="mb-2 text-xs tracking-wider uppercase opacity-40">
            {t('detail.info.tags')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 10).map((tag) => (
              <span
                key={tag.id}
                className="badge badge-sm badge-ghost opacity-70"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {game.website && (
        <a
          href={game.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-primary btn-sm w-full mt-2"
        >
          <Globe size={14} />
          {t('detail.info.website')}
        </a>
      )}
    </div>
  );
};

export default GameInfoCard;
