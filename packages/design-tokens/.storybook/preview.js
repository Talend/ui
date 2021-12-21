import 'typeface-source-sans-pro';

import React from 'react';
import { DocsContainer } from '@storybook/addon-docs';

import tokens from '../src';

import '../src/index.scss';
import './preview.scss';

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
				<div data-theme={hasDarkTheme ? 'dark' : 'light'}>
					<DocsContainer {...props} />;
				</div>
			);
		},
	},
};
