import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru } from '.utils/locales';

const i18n = i18next.createInstance();

const resources = {
    ru,
}

const init = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default init;