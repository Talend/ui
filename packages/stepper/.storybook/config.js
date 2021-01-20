import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';

a11y(ReactDOM);
addDecorator(withInfo);
addDecorator(story => (
	<React.Fragment>
		<IconsProvider />
		{story()}
	</React.Fragment>
));

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
