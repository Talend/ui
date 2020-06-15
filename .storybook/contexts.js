import { ThemeProvider } from 'styled-components';
import light, { dark } from '../src/themes';

export const contexts = [
	{
		icon: 'paintbrush',
		title: 'Change the theme of the preview',
		components: [ThemeProvider],
		params: [
			{
				name: 'Light theme',
				props: { theme: light, propagate: true },
				default: true,
			},
			{
				name: 'Dark theme',
				props: { theme: dark, propagate: true },
			},
		],
		options: {
			deep: true,
			cancelable: false,
		},
	},
];
