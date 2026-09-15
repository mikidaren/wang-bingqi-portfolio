import { useTranslate } from '../i18n/context';

export default function About() {
  const { t } = useTranslate();
  return (
    <div className="grid md:grid-cols-3 gap-16 items-start">
      <div className="md:col-span-1">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
          {t('nav.about')}
        </p>
        <img
          src="/assets/portrait-bw.webp"
          alt="WANG Bingqi"
          className="w-full grayscale contrast-125 opacity-90"
          loading="lazy"
        />
      </div>

      <div className="md:col-span-2 text-sm md:text-base leading-relaxed text-[var(--color-muted)] space-y-4">
        <div className="text-sm font-bold text-white space-y-1 mb-6">
          <p>{t('about.email')}</p>
          <p>{t('about.phone')}</p>
          <p>{t('about.edu')}</p>
        </div>
        <p>
          {t('about.p1', { ceedi: t('about.ceedi') })}
        </p>
        <p>
          {t('about.p2')}
        </p>
        <p>
          {t('about.p3')}
        </p>
      </div>
    </div>
  );
}
