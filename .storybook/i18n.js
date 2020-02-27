import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { namespaces as tuiNamespaces } from '@talend/locales-tui/namespaces';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

const languages = {};
Object.keys(tuiLocales).forEach(key => languages[key] = key);

i18n.use(initReactI18next).init({
    debug: false,
    interpolation: {
        format: (value, format) => {
            if (value && format === 'lowercase') return value.toLocaleLowerCase();
            if (value && format === 'uppercase') return value.toLocaleUpperCase();
            return value;
        },
    },
    languages,
    ns: [...tuiNamespaces],
    resources: tuiLocales,
    wait: true, // globally set to wait for loaded translations in translate hoc
});

export default i18n;
