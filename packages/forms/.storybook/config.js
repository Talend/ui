import { configure } from '@storybook/react';

import '@talend/bootstrap-theme/src/theme/theme.scss';

function loadStories() {
	require('../stories-core');
	require('../stories');
}

configure(loadStories, module);
