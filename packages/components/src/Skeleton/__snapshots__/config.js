import { configure } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

function loadStories() {
	require('../../../stories/Skeleton'); // eslint-disable-line global-require
}

configure(loadStories, module);
