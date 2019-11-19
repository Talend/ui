import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import 'focus-outline-manager';
import '../stories/config/i18n';

function loadStories() {
	require('../stories');
}

addDecorator(withA11y);
configure(loadStories, module);
