import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import 'babel-polyfill';

import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

import '!style!css!postcss!sass!@talend/bootstrap-theme/src/theme/theme.scss';

a11y(ReactDOM);

setAddon(infoAddon);
setAddon(withPropsCombinations);

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
