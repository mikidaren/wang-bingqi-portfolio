import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslate } from '../i18n/context';
import LangSwitcher from './LangSwitcher';

const linkKeys = ['About', 'Projects', 'CV', 'Skills', 'Contact'] as const;

export default function Navbar() {
  const { t } = useTranslate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-16">
        <a href="#" className="text-lg font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
          WANG Bingqi
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {linkKeys.map((k) => (
            <li key={k}>
              <a href={`#${k.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
                {t(`nav.${k.toLowerCase()}`)}
              </a>
            </li>
          ))}
          <li><a href="https://studio.miki2022.eu.org" className="text-[var(--color-muted)] hover:text-white transition-colors duration-200" target="_blank">Studio</a></li>
          <li><LangSwitcher /></li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-[var(--color-border)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4 text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {linkKeys.map((k) => (
                <li key={k}>
                  <a href={`#${k.toLowerCase()}`} onClick={() => setOpen(false)} className="hover:text-white transition-colors">
                    {t(`nav.${k.toLowerCase()}`)}
                  </a>
                </li>
              ))}
              <li><a href="https://studio.miki2022.eu.org" target="_blank" className="text-[var(--color-muted)] hover:text-white transition-colors">Studio</a></li>
              <li><LangSwitcher /></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
