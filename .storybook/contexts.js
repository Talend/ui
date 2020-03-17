import { ThemeProvider } from 'styled-components';
import defaultTheme, { darkTheme } from '../src/tokens';

export const contexts = [
	{
		icon: 'box',
		title: 'Change the theme of the preview',
		components: [ThemeProvider],
		params: [
			{
				name: 'Default theme',
				props: { theme: defaultTheme, default: true },
			},
			{ name: 'Dark theme', props: { theme: darkTheme } },
		],
		options: {
			deep: true,
			cancelable: false,
		},
	},
];
