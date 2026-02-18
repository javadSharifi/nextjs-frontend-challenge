import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import { QueryProvider } from '@/src/providers/QueryProvider';
import { Provider } from '@/src/components/ui/provider';
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
    <html lang={locale} suppressHydrationWarning dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <QueryProvider>{children}</QueryProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
