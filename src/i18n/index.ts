import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translations.json';
import es from './es/translations.json';
import ru from './ru/translations.json';

export interface Language {
  code: string;
  name: string;
}

export interface SupportedLanguages {
  [key: string]: Language;
}

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  ru: {
    translation: ru,
  },
};

export const getDefaultLanguage = () => {
  return i18n.language;
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
  'en-US': {
    code: 'en-US',
    name: 'English',
  },
  'es-US': {
    code: 'es-US',
    name: 'Spanish',
  },
  'ru-RU': {
    code: 'ru-RU',
    name: 'Russian',
  },
};

export const defaultInterfaceLanguage: Language = {
  code: 'en-US',
  name: 'English (United States)',
};
