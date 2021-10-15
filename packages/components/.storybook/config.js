import '@talend/bootstrap-theme/dist/bootstrap.css';

import React from 'react';
import { ThemeProvider } from '@talend/design-system';

import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import 'focus-outline-manager';
import '../../../.storybook/sortStories';
import { IconsProvider } from '../src';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));
addDecorator(withA11y);
addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>);
addDecorator(storyFn => (
	<>
		<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
		<React.Suspense fallback={null}>{storyFn()}</React.Suspense>
	</>
));

addParameters({ layout: 'fullscreen' });

configure([require.context('../src', true, /\.stories\.js$/)], module);
