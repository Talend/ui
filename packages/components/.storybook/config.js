import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import { configure, addDecorator } from '@storybook/react';
import withInfo from '@storybook/addon-info';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';

a11y(ReactDOM);
addDecorator(withInfo);
addDecorator(withPropsCombinations);

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
