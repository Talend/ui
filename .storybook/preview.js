import React from 'react';
import { addParameters } from '@storybook/react';
import { withTableOfContents } from 'storybook-docs-toc';
import 'focus-outline-manager';
import { normalize } from 'polished';

import light, { dark } from '../src/themes';
import tokens from '../src/tokens';
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

const GlobalStyle = ThemeProvider.createGlobalStyle(
	({ theme }) => `
	${normalize()};

	*, ::after, ::before {
		box-sizing: border-box;
	}
	
	::selection {
	  	background-color: ${tokens.colors.coral100};
	}
	
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
		scroll-behavior: smooth;
	}

	body {
		margin: 0;
		padding: 0;
        font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}
	
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    a {
        text-decoration: none;
	}
	
	:focus,
	button:focus {
		outline: 0.3rem solid ${theme.colors.focusColor};
	}

	.focus-outline-hidden *:focus {
		outline: none;
	}
	
	
	.sb-show-main.sb-main-padded {
		padding: 0;
	}
		.sbdocs .sbdocs-preview {
			background: ${theme.colors.backgroundColor};
		}
	`,
);

const withThemeProvider = (Story, context) => {
	const theme = getTheme(context.globals.theme);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Story {...context} />
		</ThemeProvider>
	);
};
export const decorators = [withThemeProvider];

addParameters(withTableOfContents());
