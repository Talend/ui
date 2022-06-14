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
};
