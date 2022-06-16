import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from '../locales/de.json';
import en from '../locales/en.json';

const configureI18n = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
  });
};

export { configureI18n };
