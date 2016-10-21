import React from 'react';
import a11y from 'react-a11y';

import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

a11y(React);

setAddon(infoAddon);

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
