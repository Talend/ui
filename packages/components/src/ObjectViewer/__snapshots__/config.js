import { configure } from '@storybook/react';

function loadStories() {
	require('../../../stories/ObjectViewer');
}

configure(loadStories, module);
