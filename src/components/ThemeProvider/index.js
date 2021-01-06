import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import defaultTheme from '../../themes';
import tokens from '../../tokens';

import reset from './reset';

const GlobalStyle = createGlobalStyle`  
	${reset};

	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}

	body {
		margin: 0;
		padding: 0;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}

	a {
		text-decoration: none;
	}

	.focus-outline-hidden *:focus {
		outline: none;
	}

	::selection {
		background-color: ${tokens.colors.coral100};
	}
`;

const TalendThemeProvider = ({ theme = defaultTheme, children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

TalendThemeProvider.createGlobalStyle = createGlobalStyle;
TalendThemeProvider.GlobalStyle = GlobalStyle;

export default TalendThemeProvider;
