'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

interface IGameCardLinkProps {
  slug: string;
  children: React.ReactNode;
}

const GameCardLink = ({ slug, children }: IGameCardLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push(`/game/${slug}`);
    });
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      {children}
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default GameCardLink;
