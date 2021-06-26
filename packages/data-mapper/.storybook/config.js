import { configure } from '@storybook/react';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
