import { ThemeProvider } from 'styled-components';
import light, { dark } from '../src/themes';

export const contexts = [
	{
		icon: 'paintbrush',
		title: 'Change the theme of the preview',
		components: [ThemeProvider],
		params: [
			{
				name: 'Default theme',
				props: { theme: light, default: true },
			},
			{
				name: 'Dark theme',
				props: { theme: dark },
			},
		],
		options: {
			deep: true,
			disable: false,
			cancelable: false,
		},
	},
];
