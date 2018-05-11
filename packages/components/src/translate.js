import { createInstance } from 'i18next';
import { setI18n } from 'react-i18next';

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
setI18n(createInstance({}, () => {}));
