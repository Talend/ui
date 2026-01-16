require('@talend/bootstrap-theme/dist/bootstrap.css');
const { createPreviewConfig, initI18n } = require('@talend/storybook-config');

const {
	namespaces: designSystemNamespaces,
	locales: designSystemLocales,
} = require('@talend/locales-design-system');
const {
	namespaces: tuiComponentsNamespaces,
	locales: tuiComponentsLocales,
} = require('@talend/locales-tui-components');
const {
	namespaces: tuiContainersNamespaces,
	locales: tuiContainersLocales,
} = require('@talend/locales-tui-containers');
const {
	namespaces: tuiFacetedSearchNamespaces,
	locales: tuiFacetedSearchLocales,
} = require('@talend/locales-tui-faceted-search');
const {
	namespaces: tuiFormsNamespaces,
	locales: tuiFormsLocales,
} = require('@talend/locales-tui-forms');

const preview = createPreviewConfig(
	{
		i18n: {
			namespaces: [
				...designSystemNamespaces,
				...tuiComponentsNamespaces,
				...tuiContainersNamespaces,
				...tuiFormsNamespaces,
				...tuiFacetedSearchNamespaces,
			],
			locales: Object.keys(designSystemLocales).reduce(
				(resources, language) => ({
					...resources,
					[language]: {
						...designSystemLocales[language],
						...tuiComponentsLocales[language],
						...tuiContainersLocales[language],
						...tuiFacetedSearchLocales[language],
						...tuiFormsLocales[language],
					},
				}),
				{},
			),
		},
		parameters: {},
	},
	initI18n,
);

const { globalTypes, decorators, parameters, loaders } = preview;

module.exports = {
	globalTypes,
	decorators,
	parameters,
	loaders,
};
