import { useTranslate, type Lang } from '../i18n/context';

const langs: { key: Lang; labelKey: string }[] = [
  { key: 'en', labelKey: 'lang.en' },
  { key: 'zh-cn', labelKey: 'lang.zh-cn' },
  { key: 'zh-tw', labelKey: 'lang.zh-tw' },
];

export default function LangSwitcher() {
  const { lang, setLang, t } = useTranslate();

  return (
    <div className="flex gap-1 border border-[var(--color-border)]">
      {langs.map((l) => (
        <button
          key={l.key}
          onClick={() => setLang(l.key)}
          className={`px-1.5 py-0.5 text-[10px] uppercase tracking-wider transition-colors ${
            lang === l.key ? 'bg-white text-black' : 'text-[var(--color-muted)] hover:text-white'
          }`}
        >
          {t(l.labelKey)}
        </button>
      ))}
    </div>
  );
}
