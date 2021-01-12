import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';
import { ThemeProvider } from '@talend/design-system/lib';

import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import 'focus-outline-manager';
import '../../../.storybook/sortStories';
import i18n from './../../../.storybook/i18n';
import { IconsProvider } from '../src';

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
addDecorator(storyFn => (
	<>
		<IconsProvider
			bundles={['https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg']}
		/>
		{storyFn()}
	</>
));

configure([require.context('../src', true, /\.stories\.js$/)], module);
