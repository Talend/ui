import { create } from '@storybook/theming/create';
import logo from './logo.svg';

export default create({
	base: 'light',

	colorPrimary: '#19426c',
	colorSecondary: '#19426c',

	// UI
	appBg: '#f3f3f3',
	appContentBg: 'white',
	appBorderColor: '#C6C6C6',
	appBorderRadius: 4,

	// Typography
	fontBase: '"Open Sans", sans-serif',
	fontCode: '"Inconsolata", monospace',

	// Text colors
	textColor: '#202020',
	textInverseColor: 'rgba(255,255,255,0.9)',

	// Toolbar default and active colors
	barTextColor: '#555555',
	barSelectedColor: '#202020',
	barBg: 'white',

	// Form colors
	inputBg: 'white',
	inputBorder: 'silver',
	inputTextColor: 'black',
	inputBorderRadius: 4,

	brandTitle: 'Coral',
	// brandUrl: '/',
	brandImage: logo,
});
