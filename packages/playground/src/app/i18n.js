/* eslint-disable @talend/import-depth */
/* eslint-disable import/no-extraneous-dependencies */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
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

export function initI18n() {
	i18next
		.use(initReactI18next)
		.use(HttpApi)
		.init({
			fallbackLng: 'en',
			lng: 'fr',
			ns: [
				...tuiComponentsNamespaces,
				...tuiContainersNamespaces,
				...tuiDatagridNamespaces,
				...tuiFormsNamespaces,
			],
			react: {
				useSuspense: false,
			},
			interpolation: {
				escapeValue: false,
			},
			backend: {
				loadPath,
			},
			defaultNS: 'talend-ui-playground',
		});
}
