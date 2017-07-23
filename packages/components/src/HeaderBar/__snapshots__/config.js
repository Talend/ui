import { configure } from '@storybook/react';

function loadStories() {
	require('../../../stories/HeaderBar');
}

configure(loadStories, module);
