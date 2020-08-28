import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle(
	({ theme }) => `

	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}

	body {
		margin: 0;
		padding: 0;
        font-size: 14px;
	}

	.sb-show-main,
	.sbdocs.sbdocs-preview {
		background: ${theme.colors.backgroundColor};
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

ThemeProvider.GlobalStyle = GlobalStyle;

export default ThemeProvider;
