import { useTranslations } from 'next-intl';

interface IGameSectionHeaderProps {
  title: string;
  totalCount: number;
}

const GameSectionHeader = ({ title, totalCount }: IGameSectionHeaderProps) => {
  const t = useTranslations('GameSectionHeader');

  return (
    <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
      <h1 className="text-3xl font-bold tracking-tight text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        {title}
      </h1>
      <span className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary border border-secondary/20 shadow-[0_0_10px_rgba(var(--secondary),0.3)]">
        {totalCount} {t('games_found')}
      </span>
    </div>
  );
};

export default GameSectionHeader;
