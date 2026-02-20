import { Provider } from '@/src/components/ui/provider';

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
