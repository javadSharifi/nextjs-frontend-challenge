import { LayoutDashboard, Gamepad2, ListFilter, LucideIcon } from 'lucide-react';

export interface ModuleTheme {
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export interface ModuleItem {
  name: string;
  href: string;
  icon: LucideIcon;
  theme: ModuleTheme;
}

export const MODULE_THEMES = {
  blue: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-500',
  },
  purple: {
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-500',
  },
  emerald: {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-500',
  },
} as const;

export const MODULES: ModuleItem[] = [
  {
    name: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    theme: MODULE_THEMES.blue,
  },
  {
    name: 'games',
    href: '/games',
    icon: Gamepad2,
    theme: MODULE_THEMES.purple,
  },
  {
    name: 'dropdown',
    href: '/advanced-select',
    icon: ListFilter,
    theme: MODULE_THEMES.emerald,
  },
];
