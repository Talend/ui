import React from 'react';
import { I18nextProvider } from 'react-i18next';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

import i18n from './i18n';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
	(Story, context) => {
		i18n.changeLanguage(context.globals.locale);
		return (
			<I18nextProvider i18n={i18n}>
				<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
				<React.Suspense fallback={null}>
					<Story />
				</React.Suspense>
			</I18nextProvider>
		);
	},
];

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
