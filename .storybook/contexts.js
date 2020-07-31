import { ThemeProvider } from '../src/components/ThemeProvider';
import light, { dark } from '../src/themes';

export const contexts = [
	{
		icon: 'mirror',
		title: 'Change the theme of the preview',
		components: [ThemeProvider],
		params: [
			{
				name: 'Default theme',
				props: { theme: light },
				default: true,
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
