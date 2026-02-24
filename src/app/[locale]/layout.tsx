import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Rajdhani, Orbitron, Space_Grotesk } from 'next/font/google';
import { QueryProvider } from '@/src/providers/QueryProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '../globals.css';
import { ColorModeProvider } from './dashboard/_components/color-mode';
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
  title: { default: 'Frontend Challenge', template: '%s | Frontend Challenge' },
  description: 'Frontend Challenge Application',
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
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      className={`${rajdhani.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NuqsAdapter>
          <ColorModeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <QueryProvider>{children}</QueryProvider>
            </NextIntlClientProvider>
          </ColorModeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
