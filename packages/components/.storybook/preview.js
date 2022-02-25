import '@talend/bootstrap-theme/dist/bootstrap.css';

import React from 'react';
import { ThemeProvider } from '@talend/design-system';
import { IconsProvider } from '@talend/design-system';
import { withA11y } from '@storybook/addon-a11y';
import { namespaces } from '@talend/locales-tui-components/namespaces';
import init, { withI18Next } from '../../../.storybook/i18n';
export { globalTypes } from '../../../.storybook/i18n';
import { addParameters } from '@storybook/react';

import 'focus-outline-manager';
import '../../../.storybook/sortStories';

init({
	defaultNS: namespaces[0],
	fallbackNS: namespaces,
});
addParameters({ layout: 'fullscreen' });

export const decorators = [
	withA11y,
	withI18Next,
	storyFn => (
		<ThemeProvider>
			<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
			{storyFn()}
		</ThemeProvider>
	),
];
