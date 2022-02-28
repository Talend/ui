import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import assetsApi from '@talend/assets-api';

import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiDatagridNamespaces } from '@talend/locales-tui-datagrid/namespaces';
import { namespaces as tuiFormsNamespaces } from '@talend/locales-tui-forms/namespaces';
import { namespaces as tuiDataVizNamespaces } from '@talend/locales-tui-dataviz/namespaces';

const LOCALES_MAP = {
	'tui-components': assetsApi.getURL(
		'/locales/{{lng}}/{{ns}}.json',
		'@talend/locales-tui-components',
	),
	'tui-containers': assetsApi.getURL(
		'/locales/{{lng}}/{{ns}}.json',
		'@talend/locales-tui-containers',
	),
	'tui-datagrid': assetsApi.getURL('/locales/{{lng}}/{{ns}}.json', '@talend/locales-tui-datagrid'),
	'tui-dataviz': assetsApi.getURL('/locales/{{lng}}/{{ns}}.json', '@talend/locales-tui-dataviz'),
	'tui-faceted-search': assetsApi.getURL(
		'/locales/{{lng}}/{{ns}}.json',
		'@talend/locales-tui-faceted-search',
	),
	'tui-forms': assetsApi.getURL('/locales/{{lng}}/{{ns}}.json', '@talend/locales-tui-forms'),
};

function loadPath(languages, namespaces) {
	return LOCALES_MAP[namespaces[0]] || '/assets/locales/{{lng}}/{{ns}}.json';
}

export function init(opts) {
	return i18n
		.use(initReactI18next)
		.use(HttpApi)
		.init({
			...opts,
			ns: [
				...tuiComponentsNamespaces,
				...tuiContainersNamespaces,
				...tuiDatagridNamespaces,
				...tuiFormsNamespaces,
				...tuiDataVizNamespaces,
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

export const globalTypes = {
	locale: {
		name: 'Locale',
		defaultValue: 'en',
		toolbar: {
			icon: 'globe',
			items: [
				{ value: 'en', title: 'en' },
				{ value: 'fr', title: 'fr' },
				{ value: 'ja', title: 'ja' },
				{ value: 'zh', title: 'zh' },
			],
		},
	},
};

export const withI18Next = (storyFn, context) => {
	i18n.changeLanguage(context.globals.locale);

	return (
		<React.Suspense fallback={null}>
			<I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
		</React.Suspense>
	);
};
