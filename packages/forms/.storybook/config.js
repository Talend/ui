import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

import '../node_modules/bootstrap-talend-theme/src/theme/theme.scss';

setAddon(infoAddon);

function loadStories() {
	require('../stories');
	require('../stories-core');
}

configure(loadStories, module);
