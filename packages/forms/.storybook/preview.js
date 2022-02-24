import React from 'react';
import { IconsProvider, ThemeProvider } from '@talend/design-system';
import init, { withI18Next } from '../../../.storybook/i18n';
import { withA11y } from '@storybook/addon-a11y';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};

init({});

const withFormLayout = (story, options) => {
	if (options.kind.includes('Layout')) {
		return story();
	}
	return (
		<div className="container-fluid">
			<div
				className="col-md-offset-1 col-md-10"
				style={{ marginTop: '20px', marginBottom: '20px' }}
			>
				{story()}
			</div>
		</div>
	);
};

export const decorators = [
	withA11y,
	withFormLayout,
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
