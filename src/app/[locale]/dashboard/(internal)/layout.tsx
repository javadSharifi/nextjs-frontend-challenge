import DashboardLayout from '../_components/DashboardLayout';
import RouteGuard from '../_components/RouteGuard';

export default function InternalDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </RouteGuard>
  );
}
