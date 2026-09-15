import { motion } from 'framer-motion';
import { useTranslate } from '../i18n/context';

export default function Hero() {
  const { t } = useTranslate();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero1.webp"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/60 to-[var(--color-bg)]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.p
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t('hero.role')}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          WANG
          <br />
          <span className="text-[var(--color-muted)]">Bingqi</span>
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {t('hero.tagline1')}
          <br />
          {t('hero.tagline2')}
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <a
            href="#projects"
            className="inline-block border border-[var(--color-border)] px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
          >
            {t('hero.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
