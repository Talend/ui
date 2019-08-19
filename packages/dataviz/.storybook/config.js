import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import 'focus-outline-manager';
import '@talend/bootstrap-theme/src/theme/theme.scss';

function loadStories() {
	require('../stories');
}

addDecorator(withA11y);
configure(loadStories, module);
