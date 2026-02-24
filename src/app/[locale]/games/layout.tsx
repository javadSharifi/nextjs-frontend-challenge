import { Metadata } from 'next';
import '../../globals.css';
import { GamesProvider } from '@/src/providers/GamesProvider';

export const metadata: Metadata = {
  title: 'Games Explorer',
  description: 'Explore the latest and greatest games.',
  openGraph: {
    title: 'Games Explorer',
    description: 'Explore the latest and greatest games.',
    type: 'website',
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <GamesProvider>{children}</GamesProvider>;
}
