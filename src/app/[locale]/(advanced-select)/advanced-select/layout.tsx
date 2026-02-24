import { Metadata } from 'next';
import '../../../globals.css';
import { AdvancedSelectProvider } from '@/src/providers/AdvancedSelectProvider';

export const metadata: Metadata = {
  title: 'Advanced Select Component',
  description: 'A highly customizable select component built with Tailwind CSS.',
};

export default function AdvancedSelectLayout({ children }: { children: React.ReactNode }) {
  return <AdvancedSelectProvider>{children}</AdvancedSelectProvider>;
}
