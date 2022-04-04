import React from 'react';
import { DocsContainer } from '@storybook/addon-docs';

import 'typeface-source-sans-pro';
import './preview.scss';
import '../src/index.scss';

const TokenOrder = [
	'Colors',
	'Color Compositions',
	'Color Charts',
	'Branding',
	'Gradients',
	'Typography',
	'Measures',
	'Opacity',
	'Radius',
	'Borders',
	'Shadows',
	'Transitions',
	'Elevations',
	'Breakpoints',
];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		container: props => {
			const title = props.context.title;
			const hasDarkTheme = title.toLocaleLowerCase().includes('dark');
			return (
				<div id="playground" data-theme={hasDarkTheme ? 'dark' : 'light'}>
					<DocsContainer {...props} />;
				</div>
			);
		},
	},
	options: {
		storySort: {
			order: ['Welcome', 'Themes', ['Light', TokenOrder, 'Dark', TokenOrder]],
		} /**/,
	},
};
