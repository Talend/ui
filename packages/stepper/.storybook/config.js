import React from 'react';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from '@talend/design-system';
import { withA11y } from '@storybook/addon-a11y';

import '@talend/bootstrap-theme/src/theme/theme.scss';


function withIconsProvider(storyFn) {
	return (
		<>
			<IconsProvider bundles={['https://statics.cloud.talend.com/@talend/icons/6.30.0/dist/svg-bundle/all.svg']} />
			{storyFn()}
		</>
	);
}

addDecorator(withIconsProvider);
addDecorator(withA11y);
addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>);

configure(
	[
		require.context('../stories', false, /index\.js$/),
	]
	, module);
