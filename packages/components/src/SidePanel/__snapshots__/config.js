import { configure } from '@storybook/react';

function loadStories() {
	require('../../../stories/SidePanel');
}

configure(loadStories, module);
