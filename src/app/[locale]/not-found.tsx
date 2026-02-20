import { Link } from '@/src/i18n/routing';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base text-white">
      <h1 className="font-display text-8xl font-black text-primary">404</h1>
      <p className="mt-4 text-text-secondary">این صفحه وجود ندارد</p>
      <Link href="/games" className="mt-8 rounded-lg bg-primary px-6 py-3 font-bold text-white hover:bg-primary-hover transition-colors">
        بازگشت به بازی‌ها
      </Link>
    </div>
  );
};

export default NotFound;
