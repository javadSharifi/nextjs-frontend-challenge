import { Link } from '@/src/i18n/routing';

const NotFound = () => {
  return (
    <div className="bg-bg-base flex min-h-screen flex-col items-center justify-center text-white">
      <h1 className="font-display text-primary text-8xl font-black">404</h1>
      <p className="text-text-secondary mt-4">این صفحه وجود ندارد</p>
      <Link
        href="/games"
        className="bg-primary hover:bg-primary-hover mt-8 rounded-lg px-6 py-3 font-bold text-white transition-colors"
      >
        بازگشت به بازی‌ها
      </Link>
    </div>
  );
};

export default NotFound;
