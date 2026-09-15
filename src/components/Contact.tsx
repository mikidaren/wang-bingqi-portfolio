import { useTranslate } from '../i18n/context';

export default function Contact() {
  const { t } = useTranslate();
  return (
    <div className="grid md:grid-cols-2 gap-16">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
          {t('contact.title')}
        </h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-md mb-8">
          {t('contact.desc')}
        </p>
        <a
          href="mailto:bwang88-c@my.cityu.edu.hk"
          className="inline-block border border-[var(--color-border)] px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
        >
          {t('contact.email')}
        </a>
      </div>

      <div className="space-y-8">
        {[
          { labelKey: 'contact.label.email', value: 'bwang88-c@my.cityu.edu.hk', href: 'mailto:bwang88-c@my.cityu.edu.hk' },
          { labelKey: 'contact.label.phone', value: '+86 18822122247' },
          { labelKey: 'contact.label.wechat', value: 'mikidaren' },
          { labelKey: 'contact.label.location', value: 'Beijing / Hong Kong SAR' },
        ].map((item) => (
          <div key={item.labelKey} className="flex items-baseline gap-4 group">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] w-20 flex-shrink-0">
              {t(item.labelKey)}
            </p>
            {item.href ? (
              <a href={item.href} className="text-sm hover:opacity-70 transition-opacity">
                {item.value}
              </a>
            ) : (
              <p className="text-sm">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
