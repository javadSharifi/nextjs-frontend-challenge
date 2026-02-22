import { ReactNode } from 'react';

const AdvancedSelectLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter glow-text italic">
            Advanced Select <span className="text-primary">Dropdown</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-medium">
            Production-grade, enterprise-ready, virtualized component.
          </p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdvancedSelectLayout;
