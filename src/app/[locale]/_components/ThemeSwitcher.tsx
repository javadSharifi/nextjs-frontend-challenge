'use client';

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const THEMES = [
  { id: 'nexus', name: 'Nexus (Dark Red)', type: 'dark' },
  { id: 'night', name: 'Night (Dark Blue)', type: 'dark' },
  { id: 'light', name: 'Light (Modern)', type: 'light' },
  { id: 'cupcake', name: 'Cupcake (Soft)', type: 'light' },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('nexus');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'nexus';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('theme', themeId);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
        <Palette size={16} />
        <span className="hidden md:inline">تم</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-2xl border border-white/5 backdrop-blur-xl">
        {THEMES.map((theme) => (
          <li key={theme.id}>
            <button
              onClick={() => handleThemeChange(theme.id)}
              className={`flex items-center justify-between ${currentTheme === theme.id ? 'active' : ''}`}
            >
              <span>{theme.name}</span>
              <span className={`badge badge-xs ${theme.type === 'dark' ? 'badge-neutral' : 'badge-ghost'}`}>
                {theme.type === 'dark' ? 'Dark' : 'Light'}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
