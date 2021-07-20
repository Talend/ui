import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import { ThemeProvider } from '@talend/design-system';
import { locales as tuiLocales } from '@talend/locales-tui/locales';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

import '@talend/bootstrap-theme/src/theme/theme.scss';
import i18n from '../../../.storybook/i18n';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));

function withIconsProvider(story) {
	return (
		<>
			<IconsProvider
				bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']}
			/>
			{story()}
		</>
	);
}

const withFormLayout = (story, options) => {
	if (options.kind === 'Layout') {
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

addDecorator(
	withI18next({
		i18n,
		languages,
	}),
);
addDecorator(withIconsProvider);
addDecorator(withA11y);
addDecorator(withFormLayout);
addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>);
configure(
	[
		require.context('../src', true, /\.stories\.js$/),
		require.context('../stories-core', false, /index\.js$/),
	],
	module,
);
