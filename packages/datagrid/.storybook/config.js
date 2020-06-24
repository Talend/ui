import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import 'focus-outline-manager';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import i18n from './../../../.storybook/i18n';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));
addDecorator(
	withI18next({
		i18n,
		languages,
	}),
);
addDecorator(withA11y);

configure([require.context('../src', true, /\.stories\.js$/)], module);
