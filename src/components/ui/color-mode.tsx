'use client';

import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { THEMES } from '@/src/app/[locale]/_config/themes';
import { Moon, Sun } from 'lucide-react';

export interface ColorModeProviderProps {
  children: React.ReactNode;
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <>{props.children}</>;
}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const currentTheme = theme || resolvedTheme;
  const themeConfig = THEMES.find((t) => t.id === currentTheme);
  const colorMode = themeConfig ? themeConfig.type : resolvedTheme === 'dark' ? 'dark' : 'light';

  const toggleColorMode = () => {
    setTheme(colorMode === 'dark' ? 'light' : 'nexus');
  };

  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? <Moon size={18} /> : <Sun size={18} />;
}

type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();
    return (
      <ClientOnly fallback={<Skeleton boxSize="9" />}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
          size="sm"
          ref={ref}
          {...props}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    );
  },
);

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(function DarkMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      ref={ref}
      {...props}
    />
  );
});
