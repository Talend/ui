import { configure } from '@storybook/react';

function loadStories() {
	require('../../../stories/ActionList');
}

configure(loadStories, module);
