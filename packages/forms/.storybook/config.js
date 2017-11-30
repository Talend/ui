import { configure } from '@storybook/react';

import '@talend/bootstrap-theme/src/theme/theme.scss';

function loadStories() {
	require('../stories');
	require('../stories-core');
}

configure(loadStories, module);
