import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { IconsProvider } from '@talend/design-system';

import i18n from './i18n';

export const globalTypes = {
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
};

export const decorators = [
	(Story, context) => {
		i18n.changeLanguage(context.globals?.locale);
		return (
			<div
				style={{
					height: '100%',
					width: '100%',
					overflow: 'auto',
					padding: '3rem',
					backgroundColor: 'rgba(145, 209, 237, 0.1)',
				}}
			>
				{' '}
				<I18nextProvider i18n={i18n}>
					<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
					<Story {...context} />
				</I18nextProvider>
			</div>
		);
	},
];
