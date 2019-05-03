import '@babel/polyfill';
import { configure } from '@storybook/react';
import '@talend/bootstrap-theme/src/theme/theme.scss';

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
