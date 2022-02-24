import React from 'react';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from '@talend/design-system';
import { withA11y } from '@storybook/addon-a11y';
import { namespaces } from '@talend/locales-tui-components/namespaces';
import { I18nextProvider } from 'react-i18next';
import { init } from '../../../.storybook/i18n';

import '@talend/bootstrap-theme/dist/bootstrap.css';

const i18n = init({
	defaultNS: namespaces[0],
	fallbackNS: namespaces,
});

function withProviders(storyFn) {
	return (
		<React.Suspense fallback={null}>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
					{storyFn()}
				</ThemeProvider>
			</I18nextProvider>
		</React.Suspense>
	);
}

addDecorator(withProviders);
addDecorator(withA11y);

addParameters({ layout: 'fullscreen' });

configure([require.context('../stories', false, /index\.js$/)], module);
