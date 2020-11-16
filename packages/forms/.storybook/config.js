import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import { locales as tuiLocales } from '@talend/locales-tui/locales';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

import '@talend/bootstrap-theme/src/theme/theme.scss';
import i18n from '../../../.storybook/i18n';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));

const withFormLayout = (story, options) => {
	if (options.kind === 'Layout') {
		return story();
	}
	return (
		<div className="container-fluid">
			<IconsProvider>
				<div
					className="col-md-offset-1 col-md-10"
					style={{ marginTop: '20px', marginBottom: '20px' }}
				>
					{story()}
				</div>
			</IconsProvider>
		</div>
	);
};

addDecorator(
	withI18next({
		i18n,
		languages,
	}),
);
addDecorator(withA11y);
addDecorator(withFormLayout);
configure(
	[
		require.context('../src', true, /\.stories\.js$/),
		require.context('../stories-core', false, /index\.js$/),
	],
	module,
);
