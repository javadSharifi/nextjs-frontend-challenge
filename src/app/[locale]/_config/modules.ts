import { LayoutDashboard, Gamepad2, ListFilter, LucideIcon } from 'lucide-react';

export interface ModuleItem {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const MODULES: ModuleItem[] = [
  {
    name: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'blue.500',
    bgColor: 'blue.500/10',
  },
  {
    name: 'games',
    href: '/games',
    icon: Gamepad2,
    color: 'purple.500',
    bgColor: 'purple.500/10',
  },
  {
    name: 'dropdown',
    href: '/dropdown',
    icon: ListFilter,
    color: 'emerald.500',
    bgColor: 'emerald.500/10',
  },
];
