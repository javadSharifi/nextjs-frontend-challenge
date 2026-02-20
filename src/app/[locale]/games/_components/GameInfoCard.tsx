import { Clock, Globe, Tag } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { IGame } from '../_services/games.types';

interface IGameInfoCardProps {
  game: IGame;
}

const GameInfoCard = async ({ game }: IGameInfoCardProps) => {
  const t = await getTranslations('game');

  const infoRows = [
    { label: t('detail.info.playtime'), value: game.playtime ? `${game.playtime}h avg` : '-', icon: Clock },
    { label: t('detail.info.esrb'), value: game.esrb_rating?.name || 'Not Rated', icon: Tag },
  ];

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <h3 className="font-display font-bold text-white">{t('detail.info.title')}</h3>

      {infoRows.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Icon size={14} className="text-[var(--color-primary)]" />
            {label}
          </div>
          <span className="text-sm font-medium text-white">{value}</span>
        </div>
      ))}

      {/* Tags */}
      {game.tags && game.tags.length > 0 && (
        <div>
          <p className="mb-2 text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{t('detail.info.tags')}</p>
          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 10).map((tag) => (
              <span
                key={tag.id}
                className="rounded bg-[var(--color-bg-elevated)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Website */}
      {game.website && (
        <a
          href={game.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border-accent)] px-4 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)] transition-colors w-full justify-center"
        >
          <Globe size={14} />
          {t('detail.info.website')}
        </a>
      )}
    </div>
  );
};

export default GameInfoCard;
