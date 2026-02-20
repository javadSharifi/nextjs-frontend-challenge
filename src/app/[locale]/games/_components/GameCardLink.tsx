'use client';

import { useRouter } from '@/src/i18n/routing';
import { useTransition } from 'react';

interface IGameCardLinkProps {
  href: string;
  children: React.ReactNode;
}

const GameCardLink = ({ href, children }: IGameCardLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() => startTransition(() => router.push(href))}
      className={`cursor-pointer transition-opacity ${isPending ? 'opacity-50 scale-95' : ''}`}
      style={{ transition: 'opacity 0.2s ease, transform 0.2s ease' }}
    >
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {children}
    </div>
  );
};

export default GameCardLink;
