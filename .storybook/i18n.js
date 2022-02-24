import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiDatagridNamespaces } from '@talend/locales-tui-datagrid/namespaces';
import { namespaces as tuiFormsNamespaces } from '@talend/locales-tui-forms/namespaces';

const LOCALES_MAP = {
	'tui-components': 'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
	'tui-containers': 'https://unpkg.com/@talend/locales-tui-containers/locales/{{lng}}/{{ns}}.json',
	'tui-forms': 'https://unpkg.com/@talend/locales-tui-forms/locales/{{lng}}/{{ns}}.json',
	'tui-datagrid': 'https://unpkg.com/@talend/locales-tui-datagrid/locales/{{lng}}/{{ns}}.json',
	'tui-faceted-search':
		'https://unpkg.com/@talend/locales-tui-faceted-search/locales/{{lng}}/{{ns}}.json',
};

function loadPath(languages, namespaces) {
	return LOCALES_MAP[namespaces[0]] || '/assets/locales/{{lng}}/{{ns}}.json';
}

export function init(opts) {
	i18n
		.use(initReactI18next)
		.use(HttpApi)
		.use(LanguageDetector)
		.init({
			...opts,
			ns: [
				...tuiComponentsNamespaces,
				...tuiContainersNamespaces,
				...tuiDatagridNamespaces,
				...tuiFormsNamespaces,
				...(opts.ns || []),
			],
			fallbackLng: 'en',
			interpolation: {
				escapeValue: false,
			},
			react: {
				useSuspense: false,
			},
			backend: {
				loadPath,
			},
		});
}

export default init;
