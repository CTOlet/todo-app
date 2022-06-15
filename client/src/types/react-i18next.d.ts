import 'react-i18next';
import en from '../locales/en.json';
import de from '../locales/de.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      de: typeof de;
    };
  }
}
