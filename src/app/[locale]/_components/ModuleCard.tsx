import { Link } from '@/src/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ModuleItem } from '../_config/modules';

interface ModuleIconProps {
  icon: ModuleItem['icon'];
  theme: ModuleItem['theme'];
}

const ModuleIcon = ({ icon: Icon }: ModuleIconProps) => (
  <div
    className={`bg-primary/10 text-primary mb-2 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}
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
      <h3 className="card-title text-base leading-snug font-semibold">
        {t(`modules.${name}.title`)}
      </h3>
      <p className="text-sm opacity-70">{t(`modules.${name}.description`)}</p>
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
      className={`text-primary mt-4 flex items-center text-sm font-semibold transition-all duration-300 group-hover:gap-2`}
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
        className={`card bg-base-100 border-base-content/5 hover:shadow-primary/10 h-full cursor-pointer border shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl`}
      >
        <div className="card-body p-6">
          <ModuleIcon icon={icon} theme={theme} />
          <ModuleContent name={name} />
          <ModuleAction theme={theme} />
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
