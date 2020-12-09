import React from 'react';
import { css, createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'polished';

import defaultTheme from '../../themes';
import tokens from '../../tokens';

const globalStyle = css(
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
`,
);

const TalendThemeProvider = ({ theme = defaultTheme, children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

TalendThemeProvider.createGlobalStyle = createGlobalStyle;
TalendThemeProvider.globalStyle = globalStyle;

export default TalendThemeProvider;
