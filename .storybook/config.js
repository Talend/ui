import '@talend/bootstrap-theme/src/theme/theme.scss';

import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import 'focus-outline-manager';
import './sortStories';
console.log('### root config');
const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));
addDecorator(withA11y);

configure(
	[
		require.context('../packages/components/src', true, /\.stories\.js$/),
		require.context('../packages/datagrid/src', true, /\.stories\.js$/),
	],
	module,
);
