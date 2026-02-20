import { Calendar, Globe, Building2, User } from 'lucide-react';
import { GameDetail } from '../../_services/game-detail.service';
import { useTranslations } from 'next-intl';

interface IGameInfoSidebarProps {
  game: GameDetail;
}

const GameInfoSidebar = ({ game }: IGameInfoSidebarProps) => {
  const t = useTranslations('GameDetail');

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm sticky top-4">
      <h3 className="text-xl font-bold text-foreground">{t('info')}</h3>

      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{t('released')}</span>
          </div>
          <span className="font-medium text-foreground">{game.released}</span>
        </div>

        {game.website && (
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>{t('website')}</span>
            </div>
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[150px] truncate font-medium text-secondary hover:underline"
            >
              {t('link')}
            </a>
          </div>
        )}

        {game.publishers && game.publishers.length > 0 && (
          <div className="space-y-1 border-b border-border pb-2">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-primary" />
              <span>{t('publishers')}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {game.publishers.map((p) => (
                <span key={p.id} className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {game.developers && game.developers.length > 0 && (
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-primary" />
                    <span>{t('developers')}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                    {game.developers.map((d) => (
                        <span key={d.id} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            {d.name}
                        </span>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default GameInfoSidebar;
