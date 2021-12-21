import React from 'react';
import { DocsContainer } from '@storybook/addon-docs';

import 'typeface-source-sans-pro';
import './preview.scss';
import '../src/index.scss';

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
