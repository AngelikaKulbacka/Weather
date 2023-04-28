import { createI18n } from 'vue-i18n';

import { pl, plNumber } from './pl';

const messages = { pl };

const numberFormats = { pl: plNumber };

const i18n = createI18n({
  locale: 'pl',
  legacy: false,
  messages,
  numberFormats,
});

export default i18n;
