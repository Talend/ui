import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import ThemeProvider from '@talend/design-system/lib/components/ThemeProvider';

import 'focus-outline-manager';
import '../../../.storybook/sortStories';
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

addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>);

configure([require.context('../src', true, /\.stories\.js$/)], module);
