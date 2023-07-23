import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translations.json';

const resources = {
  en: {
    translation: en,
  },
};

export const getDefaultLanguage = () => {
  return i18n.language;
};

export { useTranslation } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
