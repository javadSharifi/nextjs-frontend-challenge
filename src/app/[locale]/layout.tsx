import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Rajdhani, Orbitron, Space_Grotesk } from 'next/font/google';
import '../globals.css';
import { QueryProvider } from '@/src/providers/QueryProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from 'next-themes';
import { ThemeSync } from '@/src/providers/ThemeSync';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: { default: 'NexusGames', template: '%s | NexusGames' },
  description: 'پلتفرم بازی‌های ویدیویی',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="nexus"
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      className={`${rajdhani.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-storage') || 'nexus';
                  theme = theme.replace(/^"(.*)"$/, '$1');
                  document.documentElement.setAttribute('data-theme', theme);
                  var darkThemes = ['nexus', 'night', 'forest', 'black'];
                  if (darkThemes.includes(theme)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body>
        <NuqsAdapter>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <ThemeProvider attribute="data-theme" defaultTheme="nexus" storageKey="theme-storage">
                <ThemeSync />
                {children}
              </ThemeProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
