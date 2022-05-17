import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

export function initI18n(userI18n) {
	if (!userI18n) {
		return;
	}
	const { namespaces, locales, remoteLocalesMap } = userI18n;

	const i18nextOptions = {
		debug: true,
		defaultNS: namespaces[0],
		fallbackLng: 'en',
		fallbackNS: namespaces,
		interpolation: {
			escapeValue: false,
		},
		ns: namespaces,
		wait: true,
	};

	if (locales) {
		i18nextOptions.resources = locales;
	} else if (remoteLocalesMap) {
		i18nextOptions.backend = { loadPath: (_, namespaces) => remoteLocalesMap[namespaces[0]] };
		i18n.use(HttpApi);
	}

	i18n.use(initReactI18next).init(i18nextOptions);
	window.i18n = i18n;

	return i18n;
}
