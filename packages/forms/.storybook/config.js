import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from '@talend/design-system';
import { namespaces } from '@talend/locales-tui-forms/namespaces';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { I18nextProvider } from 'react-i18next';

import { init } from '../../../.storybook/i18n';

const i18n = init({
	defaultNS: namespaces[0],
	fallbackNS: namespaces,
});

import '@talend/bootstrap-theme/dist/bootstrap.css';

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

const withFormLayout = (story, options) => {
	if (options.kind.includes('Layout')) {
		return story();
	}
	return (
		<div className="container-fluid">
			<div
				className="col-md-offset-1 col-md-10"
				style={{ marginTop: '20px', marginBottom: '20px' }}
			>
				{story()}
			</div>
		</div>
	);
};

addParameters({ layout: 'fullscreen' });

addDecorator(withProviders);
addDecorator(withA11y);
addDecorator(withFormLayout);
configure(
	[
		require.context('../src', true, /\.stories\.js$/),
		require.context('../stories-core', false, /index\.js$/),
	],
	module,
);
