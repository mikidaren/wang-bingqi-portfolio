import { useTranslate } from '../i18n/context';

export default function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="border-t border-[var(--color-border)] px-6 md:px-16 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-xs text-[var(--color-muted)]">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-[var(--color-muted)] hover:text-white transition-colors uppercase tracking-wider"
        >
          {t('footer.back')}
        </button>
      </div>
    </footer>
  );
}
