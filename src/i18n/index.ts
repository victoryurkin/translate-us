import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translations.json';
import enLang from './en/lang.json';
import es from './es/translations.json';
import esLang from './es/lang.json';
import pl from './pl/translations.json';
import plLang from './pl/lang.json';
import ru from './ru/translations.json';
import ruLang from './ru/lang.json';
import ua from './ua/translations.json';
import uaLang from './ua/lang.json';

export interface Language {
  code: string;
  name: string;
}

export interface SupportedLanguages {
  [key: string]: Language;
}

const resources = {
  en: {
    translation: { ...en, lang: enLang },
  },
  es: {
    translation: { ...es, lang: esLang },
  },
  pl: {
    translation: { ...pl, lang: plLang },
  },
  ru: {
    translation: { ...ru, lang: ruLang },
  },
  ua: {
    translation: { ...ua, lang: uaLang },
  },
};

export const getDefaultLanguage = () => {
  return i18n.language;
};

export const getDefaultLanguageObject = () => {
  return supportedInterfaceLanguages[i18n.language] || defaultInterfaceLanguage;
};

export { useTranslation } from 'react-i18next';
export const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

export const supportedInterfaceLanguages: SupportedLanguages = {
  en: {
    code: 'en',
    name: 'English',
  },
  es: {
    code: 'es',
    name: 'Spanish',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
  },
  ua: {
    code: 'ua',
    name: 'Ukrainian',
  },
};

export const defaultInterfaceLanguage: Language = {
  code: 'en',
  name: 'English (United States)',
};
