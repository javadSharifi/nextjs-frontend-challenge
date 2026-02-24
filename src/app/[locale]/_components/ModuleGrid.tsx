'use client';

import { MODULES } from '../_config/modules';
import ModuleCard from './ModuleCard';

export default function ModuleGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {MODULES.map((module) => (
        <ModuleCard key={module.name} {...module} />
      ))}
    </div>
  );
}
