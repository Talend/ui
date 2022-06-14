import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: ThemeOptions = {
	palette: {
		type: 'light',
		primary: {
			main: '#4577ac',
			light: '#cedde5',
			dark: '#19416c',
		},
		secondary: {
			main: '#f6a5a6',
			dark: '#ff6e70',
			light: '#ffdadb',
		},
		text: {
			primary: '#202020',
			secondary: '#616161',
			disabled: '#707070',
			hint: '#202020',
		},
		background: {
			default: '#ffffff',
			paper: '#f7f7f7',
		},
		error: {
			main: '#d93335',
			light: '#ffa7a9',
			dark: '#c4484a',
		},
		warning: {
			main: '#f8c7aa',
			light: '#fce6d9',
			dark: '#f4a87b',
		},
		success: {
			main: '#409c30',
			light: '#307524',
			dark: '#204e18',
		},
	},
	typography: {
		htmlFontSize: 14,
		h1: {
			fontWeight: 600,
			fontSize: '1.8rem',
			fontFamily: 'Source Sans Pro',
		},
		fontFamily: 'Source Sans Pro',
		h2: {
			fontSize: '1.6rem',
			fontWeight: 600,
		},
		h3: {
			fontSize: '1.4rem',
			fontWeight: 600,
		},
		body1: {
			fontSize: 14,
		},
		body2: {
			fontSize: '1.2rem',
		},
		button: {
			fontSize: '1.4rem',
			fontWeight: 600,
		},
		caption: {
			fontSize: '1.4rem',
		},
		overline: {
			fontSize: '1.2rem',
		},
		h4: {
			fontSize: '1.4rem',
		},
		h5: {
			fontSize: '1.4rem',
		},
		h6: {
			fontSize: '1.4rem',
		},
		subtitle1: {
			fontSize: '1.4rem',
		},
		subtitle2: {
			fontSize: '1.2rem',
		},
	},
};
