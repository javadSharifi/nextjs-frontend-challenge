import { Metadata } from 'next';
import { ChakraProviderWrapper } from '@/src/providers/ChakraProvider';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: 'Dashboard | %s',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProviderWrapper>
      <div suppressHydrationWarning className="chakra dashboard-root">
        {children}
      </div>
    </ChakraProviderWrapper>
  );
}
