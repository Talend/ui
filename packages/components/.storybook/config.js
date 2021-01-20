import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';

import { configure, addDecorator } from '@storybook/react';
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

addDecorator(storyFn => (
	<>
		<IconsProvider
			bundles={['https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg']}
		/>
		{storyFn()}
	</>
));

configure([require.context('../src', true, /\.stories\.js$/)], module);
