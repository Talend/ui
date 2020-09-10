import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'polished';

import light from '../../themes/light.theme';

const GlobalStyle = createGlobalStyle(
	({ theme }) => `
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Inconsolata:wght@300;400;500;600;700;800;900');
    
	${normalize()};

	*, ::after, ::before {
		box-sizing: border-box;
	}
	
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
		scroll-behavior: smooth;
	}

	body {
        font-family: 'Open Sans', sans-serif;
		font-size: 14px;
		padding: 0 !important;
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

const TalendThemeProvider = ({ theme = light, children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

TalendThemeProvider.GlobalStyle = GlobalStyle;

export default TalendThemeProvider;
