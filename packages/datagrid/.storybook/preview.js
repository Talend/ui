import React from 'react';
import { IconsProvider, ThemeProvider } from '@talend/design-system';
import init, { withI18Next } from '../../../.storybook/i18n';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};

init({});

export const decorators = [
	withI18Next,
	storyFn => {
		return (
			<ThemeProvider>
				<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
				{storyFn()}
			</ThemeProvider>
		);
	},
];

export { globalTypes } from '../../../.storybook/i18n';
