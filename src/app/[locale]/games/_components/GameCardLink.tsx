'use client';

import { Link } from '@/src/i18n/routing';
import { useTransition } from 'react';

interface IGameCardLinkProps {
  href: string;
  children: React.ReactNode;
}

const GameCardLink = ({ href, children }: IGameCardLinkProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          window.location.href = href;
        });
      }}
      className={`relative block transition-opacity duration-200 ${
        isPending ? 'scale-95 opacity-50' : ''
      }`}
    >
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
          <span className="loading loading-spinner loading-md text-primary" />
        </div>
      )}
      {children}
    </Link>
  );
};

export default GameCardLink;
