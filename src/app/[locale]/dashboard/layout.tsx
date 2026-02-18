import { RouteGuard } from './_components/RouteGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-container">
      <RouteGuard>{children} </RouteGuard>
    </div>
  );
}
