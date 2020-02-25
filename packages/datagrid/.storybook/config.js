import { configure, addDecorator } from '@storybook/react';
import { withI18next } from 'storybook-addon-i18next';
import { withA11y } from '@storybook/addon-a11y';
import 'focus-outline-manager';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import { locales as tuiLocales } from '@talend/locales-tui/locales';
import i18n from './../stories/config/i18n';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));

function loadStories() {
	require('../stories');
}

addDecorator(
	withI18next({
		i18n,
		languages,
	}),
);
addDecorator(withA11y);
configure(loadStories, module);
