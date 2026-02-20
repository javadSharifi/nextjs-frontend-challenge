'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('Common'); // Assuming generic translations

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page Not Found</p>
      <Link href="/" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        Return Home
      </Link>
    </div>
  );
}
