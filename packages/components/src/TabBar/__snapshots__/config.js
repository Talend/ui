import { // eslint-disable-line import/no-extraneous-dependencies
	configure,
	setAddon,
} from '@storybook/react';
import infoAddon from // eslint-disable-line import/no-extraneous-dependencies
	'@storybook/addon-info';

setAddon(infoAddon);

function loadStories() {
	require('../../../stories/TabBar'); // eslint-disable-line global-require
}

configure(loadStories, module);
