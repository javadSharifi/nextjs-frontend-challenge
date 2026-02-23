import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Rajdhani, Orbitron, Space_Grotesk } from 'next/font/google';
import '../globals.css';
import { QueryProvider } from '@/src/providers/QueryProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

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
      suppressHydrationWarning
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      className={`${rajdhani.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <NuqsAdapter>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>{children}</QueryProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
