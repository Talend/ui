import { configure } from '@storybook/react';

function loadStories() {
	require('../../../stories/AppHeaderBar');
}

configure(loadStories, module);
