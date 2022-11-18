import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { IconsProvider, ThemeProvider } from '@talend/design-system';
import { merge } from 'lodash';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import { initI18n } from './i18n';

const { i18n: userI18n, cmf, ...userPreview } = <%  if(userFilePath) { %> require(String.raw`<%= userFilePath %>`); <% } else { %> {}; <% } %>

// msw
initialize();

// i18next
const i18n = initI18n(userI18n);

// cmf
let cmfLoader;
let cmfDecorator;
if (cmf) {
	const cmfPreview = require('./cmf').configureCmfModules(cmf.modules, cmf.settings);
	cmfLoader = cmfPreview.loader;
	cmfDecorator = cmfPreview.decorator;
}

const defaultPreview = {
	globalTypes: {
		locale: {
			name: 'Locale',
			defaultValue: 'en',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'zh', title: 'Chinese' },
					{ value: 'en', title: 'English' },
					{ value: 'fr', title: 'French' },
					{ value: 'de', title: 'German' },
					{ value: 'ja', title: 'Japanese' },
				],
			},
		},
	},
	loaders: [cmfLoader].filter(Boolean),
	decorators: [
		mswDecorator,
		(Story, context) => {
			i18n.changeLanguage(context.globals && context.globals.locale);
			return React.createElement(React.Suspense, { fallback: null },
				React.createElement(I18nextProvider, { i18n: i18n, key: 'i18n' },
					React.createElement(Story, {...context, key: 'story'})
				)
			);
		},
		(Story, context) => {
			const storyElement = React.createElement(Story, {...context, key: 'story'});
			return [
				React.createElement(IconsProvider, {
					key: 'icons-provider-decorator'
				}),
				React.createElement(ThemeProvider, {
					key: 'theme-provider-decorator'
				}, storyElement)
			];
		},
		cmfDecorator
	].filter(Boolean),
};


export const globalTypes = merge(defaultPreview.globalTypes, userPreview.globalTypes);

// Decorators are executed in the defined order (SB doc).
// But when they are executed, they decorate the result of previous decorator.
// Example: [decorator1, decorator2] will result with
// <decorator2>
//		<decorator1>
//			<Story></Story>
//		</decorator1>
// </decorator2>
// We want @talend/scripts decorators to wrap users decorators, so we put user's first
export const decorators = [...(userPreview.decorators || []), ...defaultPreview.decorators];

export const parameters = merge(defaultPreview.parameters, userPreview.parameters);

export const loaders = [...(defaultPreview.loaders || []), ...(userPreview.loaders || [])];
