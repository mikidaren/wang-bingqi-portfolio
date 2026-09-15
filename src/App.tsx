import { motion } from 'framer-motion';
import { I18nProvider } from './i18n/context';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CV from './components/CV';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

function Section({ children, id, num, className = '' }: { children: React.ReactNode; id?: string; num: string; className?: string }) {
  return (
    <motion.section
      id={id}
      className={`px-6 md:px-16 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
    >
      <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--color-muted)] mb-16">
        {num}
      </p>
      {children}
    </motion.section>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <div className="bg-[var(--color-bg)] text-[var(--color-accent)] min-h-screen">
        <Navbar />
        <Hero />
        <hr className="border-[var(--color-border)]" />
        <Section id="about" num="01">
          <About />
        </Section>
        <hr className="border-[var(--color-border)]" />
        <Section id="projects" num="02">
          <Projects />
        </Section>
        <hr className="border-[var(--color-border)]" />
        <Section id="cv" num="03">
          <CV />
        </Section>
        <hr className="border-[var(--color-border)]" />
        <Section id="skills" num="04">
          <Skills />
        </Section>
        <hr className="border-[var(--color-border)]" />
        <Section id="contact" num="05">
          <Contact />
        </Section>
        <Footer />
      </div>
    </I18nProvider>
  );
}
