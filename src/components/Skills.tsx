import { useTranslate } from '../i18n/context';

const groups = [
  { prefix: 'comp', items: ['rhino', 'grasshopper', 'python'] },
  { prefix: 'vis', items: ['vray', 'lumion', 'adobe', 'sd'] },
  { prefix: 'doc', items: ['cad', 'draw'] },
  { prefix: 'lang', items: ['cn', 'en'] },
];

export default function Skills() {
  const { t } = useTranslate();
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-12">
        {groups.map(({ prefix, items }) => (
          <div key={prefix}>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-6">
              {t(`skills.${prefix}.title`)}
            </h4>
            <div className="space-y-4">
              {items.map((item) => (
                <SkillItem
                  key={item}
                  name={t(`skills.${prefix}.${item}`)}
                  desc={t(`skills.${prefix}.${item}Desc`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="border-l border-[var(--color-border)] pl-4 hover:border-white/40 transition-colors">
      <p className="text-sm font-bold">{name}</p>
      <p className="text-xs text-[var(--color-muted)] mt-0.5">{desc}</p>
    </div>
  );
}
