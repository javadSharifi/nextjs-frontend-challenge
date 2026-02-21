import { Link } from '@/src/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ModuleItem } from '../_config/modules';

interface ModuleIconProps {
  icon: ModuleItem['icon'];
  theme: ModuleItem['theme'];
}

const ModuleIcon = ({ icon: Icon, theme }: ModuleIconProps) => (
  <div
    className={`mb-2 flex h-12 w-12 items-center justify-center rounded-xl ${theme.bgColor} ${theme.textColor} transition-transform duration-300 group-hover:scale-110`}
  >
    <Icon size={24} strokeWidth={1.75} />
  </div>
);

interface ModuleContentProps {
  name: string;
}

const ModuleContent = ({ name }: ModuleContentProps) => {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base leading-snug font-semibold text-gray-900 dark:text-white">
        {t(`modules.${name}.title`)}
      </h3>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {t(`modules.${name}.description`)}
      </p>
    </div>
  );
};

interface ModuleActionProps {
  theme: ModuleItem['theme'];
}

const ModuleAction = ({ theme }: ModuleActionProps) => {
  const t = useTranslations('Home');

  return (
    <div
      className={`mt-4 flex items-center text-sm font-semibold ${theme.textColor} transition-all duration-300 group-hover:gap-2`}
    >
      <span>{t('action')}</span>
      <ArrowRight
        size={16}
        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
      />
    </div>
  );
};

type ModuleCardProps = ModuleItem;

const ModuleCard = ({ name, href, icon, theme }: ModuleCardProps) => {
  return (
    <Link href={href} className="group block h-full no-underline">
      <div
        className={`h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 hover:${theme.borderColor} cursor-pointer`}
      >
        <ModuleIcon icon={icon} theme={theme} />
        <ModuleContent name={name} />
        <ModuleAction theme={theme} />
      </div>
    </Link>
  );
};

export default ModuleCard;
