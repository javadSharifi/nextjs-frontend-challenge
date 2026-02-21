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
    <div className="glass-card space-y-4 rounded-xl p-5">
      <h3 className="font-display font-bold text-white">{t('detail.info.title')}</h3>

      {infoRows.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="border-border-subtle flex items-center justify-between border-b pb-3"
        >
          <div className="text-text-secondary flex items-center gap-2 text-sm">
            <Icon size={14} className="text-primary" />
            {label}
          </div>
          <span className="text-sm font-medium text-white">{value}</span>
        </div>
      ))}

      {game.tags && game.tags.length > 0 && (
        <div>
          <p className="text-text-muted mb-2 text-xs tracking-wider uppercase">
            {t('detail.info.tags')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 10).map((tag) => (
              <span
                key={tag.id}
                className="bg-bg-elevated text-text-secondary rounded px-2 py-0.5 text-xs"
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
          className="border-border-accent text-primary hover:bg-primary-muted flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors"
        >
          <Globe size={14} />
          {t('detail.info.website')}
        </a>
      )}
    </div>
  );
};

export default GameInfoCard;
