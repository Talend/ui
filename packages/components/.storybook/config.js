import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

import '!style!css!postcss!sass!bootstrap-talend-theme/src/theme/theme.scss';

a11y(ReactDOM);

setAddon(infoAddon);

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
