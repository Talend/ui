import { configure } from '@storybook/react';

import 'bootstrap-talend-theme/src/theme/theme.scss';

function loadStories() {
	require('../stories');
	require('../stories-core');
}

configure(loadStories, module);
