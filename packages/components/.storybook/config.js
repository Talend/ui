import '@babel/polyfill';
import '@talend/bootstrap-theme/src/theme/theme.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

import 'focus-outline-manager';

a11y(ReactDOM);
addDecorator(checkA11y);

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
