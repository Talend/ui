import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { IconsProvider, ThemeProvider } from '@talend/design-system';
import { merge } from 'lodash';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import { initI18n } from './i18n';

const { i18n: userI18n, cmf, ...userPreview } = <%  if(userFilePath) { %> require(String.raw`<%= userFilePath %>`); <% } else { %> {}; <% } %>

// msw
initialize({ onUnhandledRequest: 'bypass' });

// i18next
const i18n = initI18n(userI18n);

// cmf
let cmfLoader;
let cmfDecorator;
if (cmf) {
	try {
		const cmfPreview = require('./cmf').configureCmfModules(cmf.modules, cmf.settings);
		cmfLoader = cmfPreview.loader;
		cmfDecorator = cmfPreview.decorator;
	} catch(e) {
		console.error(e);
	}
}

function ToggleBootstrap({ disabled }) {
	React.useEffect(() => {
		document.querySelectorAll('link[href*="bootstrap"]').forEach(link => link.disabled = disabled);
	}, [disabled]);
	return null;
}

const defaultPreview = {
	globalTypes: {
		bootstrapTheme: {
			name: 'Bootstrap theme',
			description: 'Activate bootstrap theme',
			defaultValue: 'true',
			toolbar: {
				icon: 'paintbrush',
				items: [
					{ value: 'true', left: '✅', title: 'With Bootstrap' },
					{ value: 'false', left: '❌', title: 'Without Bootstrap' },
				],
				dynamicTitle: true,
			},
		},
		theme: {
			name: 'Theme',
			description: 'Choose a theme to apply to the design system',
			defaultValue: 'light',
			toolbar: {
				icon: 'paintbrush',
				items: [
					{ value: 'light', left: '☀️', title: 'Light mode' },
					{ value: 'dark', left: '🌑', title: 'Dark mode' },
				],
				dynamicTitle: true,
			},
		},
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
				React.createElement(ToggleBootstrap, {
					disabled: context.globals.bootstrapTheme === 'false',
				}),
				React.createElement('link', {
					key: 'bootstrap-theme-decorator',
					rel: 'stylesheet',
					id: 'bootstrap-theme',
					// TODO: find a way to use it from bootstrap-theme build
					href: 'https://unpkg.com/@talend/bootstrap-theme/dist/bootstrap.css',
					media: 'screen',
					disabled: context.globals.bootstrapTheme === 'false',
				}),
				React.createElement(ThemeProvider, {
					key: 'theme-provider-decorator',
					theme: context.globals.theme,
				}, storyElement)
			];
		},
		cmfDecorator
	].filter(Boolean),
	parameters:{
		
	}
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
