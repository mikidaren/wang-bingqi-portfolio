import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslate } from '../i18n/context';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  description: string;
  images: string[];
  /** 可选：置于图片序列之后的视频（如渲染动画、过程记录） */
  video?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 'maritime',
    title: 'Dalian Maritime Museum',
    subtitle: 'Cultural Memory & Urban Connection',
    location: 'Dalian, China',
    year: '2024',
    description:
      'Located within a coastal ecological science and technology cultural park in Dalian, this project investigates the relationship between the fishing port, the city, and the sea. Through a non-linear architectural form and an immersive spatial sequence, the museum translates maritime memory into a public cultural experience, connecting local identity with contemporary urban development.',
    images: [
      '/assets/maritime8.webp', '/assets/maritime9.webp',
      '/assets/maritime10.webp', '/assets/maritime11.webp', '/assets/maritime12.webp',
      '/assets/maritime13.webp', '/assets/maritime14.webp',
    ],
    tags: ['Cultural', 'Museum', 'Coastal'],
  },
  {
    id: 'theater',
    title: 'Frankfurt Temporary Theater',
    subtitle: 'Adaptability & Civic Performance',
    location: 'Frankfurt, Germany',
    year: '2024',
    description:
      'Situated at Goetheplatz, the design responds to the historical presence of the Goethe statue, existing vegetation, and the need for a flexible performance venue. By combining a grand opera house with an experimental theater that can open toward the square, the project explores how architecture can accommodate both formal performance and spontaneous civic events.',
    images: [
      '/assets/theater15.webp', '/assets/theater16.webp', '/assets/theater17.webp',
      '/assets/theater18.webp', '/assets/theater19.webp', '/assets/theater20.webp',
      '/assets/theater21.webp',
    ],
    tags: ['Theater', 'Adaptive', 'Urban'],
  },
  {
    id: 'feather',
    title: 'Floating Feather Pavilion',
    subtitle: 'Second Prize + Wind-Art Design Award',
    location: 'Competition Entry',
    year: '2025',
    description:
      'A lightweight pavilion proposal exploring spatial atmosphere, material expression, and wind-responsive design. The pavilion symbolizes the harmonious integration of humanity and nature through a feather-like form, combining structural elegance with poetic lightness. Awarded Second Prize and the Wind-Art Design Award at the 7th Guangdong-HK-Macao Greater Bay Area ASEAN International Competition.',
    images: [
      '/assets/feather28.webp', '/assets/feather29.webp', '/assets/feather-extra.webp',
    ],
    tags: ['Pavilion', 'Competition', 'Lightweight'],
  },
  {
    id: 'digifab',
    title: 'Digital Fabrication Research',
    subtitle: 'Computational Design & Additive Manufacturing',
    location: 'Academic Research',
    year: '2025',
    description:
      'Exploration of digital fabrication workflows combining computational design with additive manufacturing. The project investigates material-informed form generation, robotic fabrication strategies, and the translation of digital models into physical prototypes — bridging the gap between algorithmic design and material reality.',
    images: [
      '/assets/digifab-1.webp', '/assets/digifab-2.webp',
    ],
    tags: ['Fabrication', 'Research', 'Digital'],
  },
  {
    id: 'thesis',
    title: 'M.Arch Final Project',
    subtitle: 'Graduate Thesis — City University of Hong Kong',
    location: 'Hong Kong',
    year: '2026',
    description:
      'The culminating work of the Master of Architecture programme at City University of Hong Kong. This thesis project integrates computational design methodologies, digital fabrication techniques, and a critical architectural position developed over two years of graduate study.',
    images: [
      '/assets/thesis-1.webp', '/assets/thesis-2.webp', '/assets/thesis-3.webp',
      '/assets/thesis-4.webp',
    ],
    video: '/assets/thesis-bridge.mp4',
    tags: ['Thesis', 'Graduate', 'CityU'],
  },
];

const otherProjects: Project[] = [
  {
    id: 'bionic',
    title: 'Bionic Human Communication Center',
    subtitle: 'Speculative Architecture & Sci-Fi Narrative',
    location: 'Academic Project',
    year: '2025',
    description:
      'A building that facilitates bionic-human communication based on the Blade Runner 2049 universe. The project explores the architectural implications of a future where the boundaries between human and replicant are blurred — designing spaces for negotiation, memory exchange, and coexistence between biological and synthetic beings.',
    images: [
      '/assets/bionic22.webp', '/assets/bionic23.webp', '/assets/bionic24.webp',
      '/assets/bionic25.webp', '/assets/bionic26.webp', '/assets/bionic27.webp',
    ],
    tags: ['Speculative', 'Sci-Fi', 'Narrative'],
  },
  {
    id: 'housing',
    title: 'Wah Fu Estate Community Hub',
    subtitle: 'Public Housing & Community Design',
    location: 'Hong Kong',
    year: '2025',
    description:
      'Located in the Wah Fu Estate residential community in southern Hong Kong, this project fosters a vibrant and caring environment where residents feel a strong sense of belonging. The design includes a central corridor connecting functional zones — recreational spaces, social gathering spots, and quiet areas for relaxation — thoughtfully arranged using the natural terrain.',
    images: [
      '/assets/housing-1.webp', '/assets/housing-2.webp', '/assets/housing-3.webp',
      '/assets/housing-4.webp', '/assets/housing-cfd1.webp', '/assets/housing-cfd2.webp',
      '/assets/housing-cfd3.webp',
    ],
    tags: ['Housing', 'Community', 'Hong Kong'],
  },
  {
    id: 'stadium',
    title: 'Shandong Stadium Competition Entry',
    subtitle: 'Sports Architecture',
    location: 'Shandong, China',
    year: '—',
    description: 'Competition bid for a sports stadium complex in Shandong Province.',
    images: ['/assets/stadium.webp'],
    tags: ['Sports', 'Competition', 'Public'],
  },
];

export default function Projects() {
  const { t } = useTranslate();
  const [active, setActive] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showOther, setShowOther] = useState(false);
  const activeProject = [...projects, ...otherProjects].find((p) => p.id === active);

  // Browser back button support
  useEffect(() => {
    if (active) {
      window.history.pushState({ projectOpen: true }, '');
      const onPop = () => setActive(null);
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }
  }, [active]);

  // Lock body scroll + ESC
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  // ESC to close
  useEffect(() => {
    if (lightbox !== null) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setLightbox(null);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, lightbox]);

  // Scroll wheel in lightbox to navigate
  useEffect(() => {
    if (lightbox === null || !activeProject) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) setLightbox((prev) => Math.min((prev ?? 0) + 1, activeProject.images.length - 1));
      else setLightbox((prev) => Math.max((prev ?? 0) - 1, 0));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [lightbox, activeProject]);

  const toggle = (id: string) => setActive(active === id ? null : id);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-12">
        {t('projects.title')}
      </p>

      {/* Project list */}
      {!active && (
        <div className="space-y-1">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              className="group cursor-pointer border-b border-[var(--color-border)] hover:border-white/30 transition-colors"
              onClick={() => toggle(p.id)}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-end justify-between py-6 md:py-8">
                <div>
                  <p className="text-xs text-[var(--color-muted)] mb-1">{p.subtitle}</p>
                  <h3 className="text-xl md:text-3xl font-bold group-hover:opacity-70 transition-opacity">
                    {p.title}
                  </h3>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-[var(--color-muted)]">{p.location}</p>
                  <p className="text-xs text-[var(--color-muted)] font-mono">{p.year}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Other Projects toggle */}
          <div className="border-b border-[var(--color-border)]">
            <button
              onClick={() => setShowOther(!showOther)}
              className="w-full flex items-center justify-between py-6 md:py-8 text-left hover:text-white transition-colors"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {t('projects.other')} {showOther ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {showOther && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 space-y-1">
                    {otherProjects.map((p) => (
                      <motion.div
                        key={p.id}
                        className="group cursor-pointer border-t border-[var(--color-border)] hover:border-white/30 transition-colors"
                        onClick={() => toggle(p.id)}
                        whileHover={{ x: 8 }}
                      >
                        <div className="flex items-end justify-between py-4">
                          <div>
                            <p className="text-xs text-[var(--color-muted)] mb-1">{p.subtitle}</p>
                            <h4 className="text-lg font-bold group-hover:opacity-70 transition-opacity">
                              {p.title}
                            </h4>
                          </div>
                          <div className="text-right hidden md:block">
                            <p className="text-xs text-[var(--color-muted)]">{p.location}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Expanded view */}
      <AnimatePresence>
        {active && activeProject && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)]"
          >
            {/* Scrollable content */}
            <div className="h-full overflow-y-auto">

            {/* Tags + description */}
            <div className="max-w-3xl mx-auto px-8 pt-16 pb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
                {activeProject.subtitle}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-none mb-6 flex items-center gap-3">
                <button
                  onClick={() => setActive(null)}
                  className="text-[var(--color-muted)] hover:text-white transition-colors text-3xl"
                  aria-label="Back"
                >
                  ←
                </button>
                {activeProject.title}
              </h2>
              <div className="flex flex-wrap gap-2 text-[10px] text-[var(--color-muted)] mb-8">
                <span className="border border-[var(--color-border)] px-2 py-1">{activeProject.location}</span>
                <span className="border border-[var(--color-border)] px-2 py-1 font-mono">{activeProject.year}</span>
                {activeProject.tags.map((t) => (
                  <span key={t} className="border border-[var(--color-border)] px-2 py-1">{t}</span>
                ))}
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-2xl">
                {activeProject.description}
              </p>
            </div>

            {/* Image cascade — click to lightbox */}
            {activeProject.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="max-w-5xl mx-auto px-6 my-6 cursor-zoom-in"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img}
                  alt={`${activeProject.title} — ${i + 1}`}
                  className="w-full object-contain"
                  style={{ maxHeight: '75vh' }}
                  loading="lazy"
                />
              </motion.div>
            ))}

            {/* Video — placed after the image cascade (thesis render animation) */}
            {activeProject.video && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto px-6 my-6"
              >
                <video
                  src={activeProject.video}
                  className="w-full object-contain"
                  style={{ maxHeight: '75vh' }}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </motion.div>
            )}

            <div className="h-32" />

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox !== null && activeProject && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
                  onClick={() => setLightbox(null)}
                >
                  <button
                    onClick={() => setLightbox(null)}
                    className="absolute top-6 right-6 text-white text-2xl hover:opacity-50 z-10"
                  >
                    ×
                  </button>
                  <p className="absolute top-6 left-6 text-xs text-[var(--color-muted)] z-10">
                    {lightbox + 1} / {activeProject.images.length}
                  </p>
                  <img
                    src={activeProject.images[lightbox]}
                    alt={`${activeProject.title} — ${lightbox + 1}`}
                    className="max-w-full max-h-full object-contain p-8"
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            </div>{/* end scrollable */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
