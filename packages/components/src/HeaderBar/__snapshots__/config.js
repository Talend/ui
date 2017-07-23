import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

setAddon(infoAddon);

function loadStories() {
	require('../../../stories/HeaderBar');
}

configure(loadStories, module);
