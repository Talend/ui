import { // eslint-disable-line import/no-extraneous-dependencies
	configure,
} from '@storybook/react';

function loadStories() {
	require('../../../stories/TabBar'); // eslint-disable-line global-require
}

configure(loadStories, module);
