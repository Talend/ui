import { createInstance } from 'i18next';

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
const DEFAULT_I18N = createInstance({}, () => {});
export default DEFAULT_I18N;
