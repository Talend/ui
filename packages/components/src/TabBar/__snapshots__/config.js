import { // eslint-disable-line import/no-extraneous-dependencies
	configure,
	setAddon,
} from '@kadira/storybook';
import infoAddon from // eslint-disable-line import/no-extraneous-dependencies
	'@kadira/react-storybook-addon-info';

setAddon(infoAddon);

function loadStories() {
	require('../../../stories/TabBar'); // eslint-disable-line global-require
}

configure(loadStories, module);
