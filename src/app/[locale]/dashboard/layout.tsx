import { Provider } from '@/src/components/ui/provider';

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div suppressHydrationWarning>{children}</div>
    </Provider>
  );
}
