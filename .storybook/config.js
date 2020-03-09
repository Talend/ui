import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import 'focus-outline-manager';
import i18n from './i18n';
import './sortStories';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));
addDecorator(
	withI18next({
		i18n,
		languages,
	}),
);
addDecorator(withA11y);

configure(
	[
		require.context('../packages/components/src', true, /\.stories\.js$/),
		require.context('../packages/datagrid/src', true, /\.stories\.js$/),
	],
	module,
);
