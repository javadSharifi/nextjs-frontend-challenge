'use client';

import { useState } from 'react';
import { GameDetail } from '../../_services/game-detail.service';
import { useTranslations } from 'next-intl';

interface IGameDescriptionProps {
  description: string;
}

const GameDescription = ({ description }: IGameDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('GameDetail');

  if (!description) return null;

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-xl font-bold text-foreground">{t('description')}</h3>
      <div
        className={`relative overflow-hidden text-muted-foreground transition-all duration-300 ${
          isExpanded ? 'max-h-full' : 'max-h-32'
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: description }} className="prose prose-invert prose-sm max-w-none" />

        {!isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        )}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {isExpanded ? t('show_less') : t('read_more')}
      </button>
    </div>
  );
};

export default GameDescription;
