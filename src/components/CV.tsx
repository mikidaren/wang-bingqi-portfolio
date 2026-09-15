const timeline = [
  {
    period: '2026 – Present',
    title: 'Assistant Architect',
    org: 'China Electronics Engineering Design Institute (CEEDI)',
    location: 'China',
    details:
      'Assistant Architect at CEEDI, a major state-owned design institute, contributing to architectural design and digital practice.',
  },
  {
    period: '2024 – 2026',
    title: 'Master of Architecture',
    org: 'City University of Hong Kong',
    location: 'Hong Kong SAR',
    details: 'Graduated. Advanced architectural design with focus on computational methods, parametric structures, and digital fabrication.',
    faculty: [
      {
        name: 'Prof. ZOU Jingyu',
        role: 'Chair Professor, Department of Architecture and Civil Engineering, City University of Hong Kong',
        desc: 'Prof. ZOU Jingyu is Chair Professor at CityU\'s Department of Architecture and Civil Engineering and a pivotal figure in computational architectural design across Asia. He has served as President of CAADRIA (Computer-Aided Architectural Design Research in Asia), the premier association advancing digital design in the region. His research encompasses parametric urbanism, BIM-enabled design workflows, smart city planning, and computational pedagogy. As a member of the Royal Institute of British Architects (RIBA) and a registered architect, Prof. Zou has led numerous funded research projects and PhD supervisions, and his work has been widely published in leading journals including Automation in Construction and Architectural Science Review. He is also a frequent keynote speaker at international conferences and has consulted for major urban development projects across China and Southeast Asia.',
        photo: '/assets/zou-jingyu.jpg',
      },
      {
        name: 'Prof. ZHENG Hao',
        role: 'Assistant Professor, Department of Architecture and Civil Engineering, City University of Hong Kong',
        desc: 'Specializes in the intersection of artificial intelligence and architectural design, with research covering generative adversarial networks (GANs), reinforcement learning for spatial layout optimization, and human-computer interaction in creative design workflows. Prof. Zheng is at the forefront of applying large language models and diffusion-based generative AI to architectural conceptualization and design automation.',
        photo: '/assets/zheng-hao.jpg',
      },
    ],
  },
  {
    period: '2020 – 2021',
    title: 'Architectural Intern',
    org: 'KFS Architects Inc.',
    location: 'Shanghai, China',
    details:
      'Supported senior architects on three public cultural projects: Zhuhai Civic Center, Zhuhai Cultural and Art Center, and Macau East-West Exchange Theater. Developed presentation drawings, photorealistic renderings, and parametric models.',
    images: [
      '/assets/kfs1.webp', '/assets/kfs2.webp', '/assets/kfs3.webp', '/assets/kfs4.webp',
    ],
  },
  {
    period: '2017 – 2022',
    title: 'Bachelor of Architecture',
    org: 'Hebei University of Technology',
    location: 'Tianjin, China',
    details: 'Project 211 University. Foundation in architectural design, theory, and practice.',
    faculty: [
      {
        name: 'Prof. LI Dexin',
        role: 'Chair, Department of Architecture, Hebei University of Technology',
        desc: 'As the head of the Architecture Department at Hebei University of Technology — a Project 211 university — Prof. Li oversees the B.Arch and M.Arch programs, shaping the next generation of architects. His leadership spans architectural design education, sustainable urbanism, and the integration of digital methodologies into the curriculum.',
        photo: '/assets/li-dexin.jpg',
      },
    ],
  },
];

const achievements = [
  {
    year: '2025',
    title: 'Digital FUTURES: AI + Artificial Intelligence + Augmented Intuition',
    desc: 'International digital design program exploring AI-assisted workflows',
    images: ['/assets/digital-futures.webp'],
    link: 'https://mp.weixin.qq.com/s/ro6dSjAJ3U7d4jrJCK0UfA',
    linkLabel: 'Featuring Hernan Diaz Alonso →',
    mentor: {
      name: 'Hernan Diaz Alonso',
      role: 'Former Director, SCI-Arc (2015–2023)',
      desc: 'Argentine-American architect and educator who served as SCI-Arc Director from 2015 to 2023, transforming the institution into a global hub for experimental digital design. Known for his dark, baroque aesthetic and complex organic geometries, Diaz Alonso pioneered the use of advanced computational and animation tools to produce highly articulated, non-linear architectural forms. His work spans speculative projects, exhibitions at MoMA and the Venice Biennale, and influential writings on post-digital aesthetics. His design philosophy — embracing the grotesque, the organic, and the computationally extreme — has shaped a generation of architects exploring the frontier between technology and form.',
    },
  },
  {
    year: '2025',
    title: 'IFoU Winter School',
    desc: 'Represented CityUHK at The Chinese University of Hong Kong',
  },
  {
    year: '2025',
    title: 'Floating Feather Pavilion — Second Prize + Wind-Art Design Award',
    desc: '7th Guangdong-HK-Macao Greater Bay Area ASEAN International Competition',
    link: 'https://mp.weixin.qq.com/s/ro6dSjAJ3U7d4jrJCK0UfA',
    linkLabel: 'View on WeChat →',
    certs: [
      { src: '/assets/award-second-prize.webp', label: 'Second Prize' },
      { src: '/assets/award-wind-art.webp', label: 'Wind-Art Design Award' },
    ],
  },
];

import { useState } from 'react';
import { useTranslate } from '../i18n/context';

export default function CV() {
  const { t } = useTranslate();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [timelineExpanded, setTimelineExpanded] = useState<number | null>(null);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-12">
        {t('cv.title')}
      </p>

      {/* Timeline */}
      <div className="space-y-12 mb-20">
        {timeline.map((item, i) => (
          <div key={i}>
            <div
              className={`grid md:grid-cols-4 gap-4 group ${(item as any).images || (item as any).faculty ? 'cursor-pointer' : ''}`}
              onClick={() => (item as any).images || (item as any).faculty ? setTimelineExpanded(timelineExpanded === i ? null : i) : null}
            >
              <p className="text-xs text-[var(--color-muted)] font-mono">{item.period}</p>
              <div className="md:col-span-3">
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-sm text-[var(--color-muted)]">
                  {item.org} — {item.location}
                </p>
                <p className="text-sm text-[var(--color-muted)] mt-1 leading-relaxed">{item.details}</p>
                {((item as any).images || (item as any).faculty) && (
                  <p className="text-[10px] text-[var(--color-muted)] mt-2 uppercase tracking-wider">
                    {timelineExpanded === i ? `\u2212 ${t('cv.collapse')}` : '+' + ((item as any).faculty ? ' ' + t('cv.viewFaculty') : '') + ((item as any).images ? (item as any).faculty ? ' / ' + t('cv.workSamples') : ' ' + t('cv.viewSamples') : '')}
                  </p>
                )}
              </div>
            </div>
            {timelineExpanded === i && ((item as any).images || (item as any).faculty) && (
              <div className="mt-4 pl-4 border-l border-white/20 space-y-6">
                {(item as any).faculty && (
                  <div className="space-y-4">
                    {(item as any).faculty.map((f: any, j: number) => (
                      <div key={j} className="flex gap-4 items-start">
                        {f.photo ? (
                          <img src={f.photo} alt={f.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-[var(--color-border)]" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex-shrink-0 flex items-center justify-center text-xs font-bold text-[var(--color-muted)] uppercase">
                            {f.name.split(' ').pop()?.charAt(0)}{f.name.split(' ')[1]?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold">{f.name}</p>
                          <p className="text-[10px] text-[var(--color-muted)]">{f.role}</p>
                          <p className="text-xs text-[var(--color-muted)] mt-1 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {(item as any).images && (
                  <div className="grid grid-cols-2 gap-4">
                    {(item as any).images.map((img: string, j: number) => (
                      <img
                        key={j}
                        src={img}
                        alt={`work sample — ${j + 1}`}
                        className="w-full object-contain border border-[var(--color-border)]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Achievements */}
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">
        {t('cv.achievements')}
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {achievements.map((a, i) => (
          <div key={i}>
            <div
              className={`border-l border-[var(--color-border)] pl-4 hover:border-white/50 transition-colors ${a.link || a.certs || (a as any).mentor ? 'cursor-pointer' : ''}`}
              onClick={() => a.link || a.certs || (a as any).mentor ? setExpanded(expanded === i ? null : i) : null}
            >
              <p className="text-xs text-[var(--color-muted)] font-mono mb-1">{a.year}</p>
              <h4 className="text-sm font-bold mb-1">{a.title}</h4>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">{a.desc}</p>
              {(a.link || a.certs || (a as any).mentor) && (
                <p className="text-[10px] text-[var(--color-muted)] mt-2 uppercase tracking-wider">
                  {expanded === i ? `\u2212 ${t('cv.collapse')}` : t('cv.viewDetails')}
                </p>
              )}
            </div>

            {/* Expanded detail */}
            {expanded === i && (a.link || a.certs || (a as any).mentor) && (
              <div className="mt-4 pl-4 border-l border-white/20 space-y-4">
                {(a as any).mentor && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex-shrink-0 flex items-center justify-center text-xs font-bold text-[var(--color-muted)]">
                      HDA
                    </div>
                    <div>
                      <p className="text-xs font-bold">{(a as any).mentor.name}</p>
                      <p className="text-[10px] text-[var(--color-muted)]">{(a as any).mentor.role}</p>
                      <p className="text-xs text-[var(--color-muted)] mt-1 leading-relaxed">{(a as any).mentor.desc}</p>
                    </div>
                  </div>
                )}
                {(a as any).images && (
                  <div className="grid grid-cols-2 gap-4">
                    {(a as any).images.map((img: string, j: number) => (
                      <img key={j} src={img} alt={`achievement image ${j + 1}`} className="w-full object-contain border border-[var(--color-border)]" loading="lazy" />
                    ))}
                  </div>
                )}
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-[var(--color-muted)] hover:text-white transition-colors border border-[var(--color-border)] px-4 py-2"
                  >
                    {a.linkLabel || 'View link →'}
                  </a>
                )}
                {a.certs && (
                  <div className="flex gap-4 overflow-x-auto">
                    {a.certs.map((cert, j) => (
                      <div key={j} className="flex-shrink-0" style={{ maxWidth: '200px' }}>
                        <img
                          src={cert.src}
                          alt={cert.label}
                          className="h-40 object-contain border border-[var(--color-border)]"
                          loading="lazy"
                        />
                        <p className="text-[10px] text-[var(--color-muted)] mt-1 text-center">{cert.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
