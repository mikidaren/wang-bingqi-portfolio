import { createContext, useContext, useState, type ReactNode } from 'react';
import en from './en';
import zhCn from './zh-cn';
import zhTw from './zh-tw';

export type Lang = 'en' | 'zh-cn' | 'zh-tw';

const dicts: Record<Lang, Record<string, string>> = { en: en, 'zh-cn': zhCn, 'zh-tw': zhTw };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const Ctx = createContext<I18nCtx>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const dict = dicts[lang];

  const t: I18nCtx['t'] = (key, vars) => {
    let val = (dict as any)[key] || (en as any)[key] || key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        val = val.replace(`{${k}}`, String(v));
      }
    }
    return val;
  };

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useTranslate() {
  return useContext(Ctx);
}
