import '@talend/bootstrap-theme/dist/bootstrap.css';

import React from 'react';
import { ThemeProvider } from '@talend/design-system';

import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { locales as tuiLocales } from '@talend/locales-tui-components/locales';
import { I18nextProvider } from 'react-i18next';

import 'focus-outline-manager';
import '../../../.storybook/sortStories';
import { IconsProvider } from '../src';
import i18n from './i18n';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));
addDecorator(withA11y);
addDecorator(storyFn => (
	<React.Suspense fallback={null}>
		<I18nextProvider i18n={i18n}>
			<ThemeProvider>
				<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
				{storyFn()}
			</ThemeProvider>
		</I18nextProvider>
	</React.Suspense>
));

addParameters({ layout: 'fullscreen' });

configure([require.context('../src', true, /\.stories\.js$/)], module);
