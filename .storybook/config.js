import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import 'focus-outline-manager';
import '../packages/components/stories/config/i18n';
import './sortStories';

addDecorator(withA11y);

configure(
	[
		require.context('../packages/components/src', true, /\.stories\.js$/),
		require.context('../packages/datagrid/src', true, /\.stories\.js$/),
	],
	module,
);
