import { configure } from '@storybook/react';

function loadStories() {
	require('../../../stories/PieChartButton');
}

configure(loadStories, module);
