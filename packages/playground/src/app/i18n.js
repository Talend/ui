/* eslint-disable @talend/import-depth */
/* eslint-disable import/no-extraneous-dependencies */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import assetsApi from '@talend/assets-api';
import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiDatagridNamespaces } from '@talend/locales-tui-datagrid/namespaces';
import { namespaces as tuiFormsNamespaces } from '@talend/locales-tui-forms/namespaces';

const LOCALES_MAP = {
	'tui-components': assetsApi.getURL(
		'/locales/{{lng}}/{{ns}}.json',
		'@talend/locales-tui-components',
	),
	'tui-containers': assetsApi.getURL(
		'/locales/{{lng}}/{{ns}}.json',
		'@talend/locales-tui-containers',
	),
	'tui-forms': assetsApi.getURL('/locales/{{lng}}/{{ns}}.json', '@talend/locales-tui-forms'),
	'tui-datagrid': assetsApi.getURL('/locales/{{lng}}/{{ns}}.json', '@talend/locales-tui-datagrid'),
	'tui-faceted-search': assetsApi.getURL(
		'/locales/{{lng}}/{{ns}}.json',
		'@talend/locales-tui-faceted-search',
	),
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
