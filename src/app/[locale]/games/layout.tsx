import { Metadata } from 'next';
import '../../globals.css';
import { GamesProvider } from '@/src/providers/GamesProvider';

export const metadata: Metadata = {
  title: 'NEXUSGAMES',
  description: 'Explore the latest and greatest games on NEXUSGAMES.',
  openGraph: {
    title: 'NEXUSGAMES',
    description: 'Explore the latest and greatest games on NEXUSGAMES.',
    type: 'website',
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <GamesProvider>{children}</GamesProvider>;
}
