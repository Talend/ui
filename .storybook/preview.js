import React from 'react';
import styled from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withTableOfContents } from 'storybook-docs-toc';
import 'focus-outline-manager';

import light, { dark } from '../src/themes';
import ThemeProvider from '../src/components/ThemeProvider';

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Choose a theme to apply to the design system',
		toolbar: {
			icon: 'mirror',
			items: [
				{ value: 'light', left: '⚪️', title: 'Default theme' },
				{ value: 'dark', left: '⚫️', title: 'Dark theme' },
			],
		},
	},
};

const getTheme = themeKey => {
	if (themeKey === 'dark') return dark;
	return light;
};

const withThemeProvider = (Story, context) => {
	const theme = getTheme(context.globals.theme);
	return (
		<ThemeProvider theme={theme}>
			<ThemeProvider.GlobalStyle />
			<Story {...context} />
		</ThemeProvider>
	);
};
export const decorators = [withThemeProvider];

addParameters(withTableOfContents());
