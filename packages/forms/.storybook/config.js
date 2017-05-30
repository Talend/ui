import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

import '!style!css!postcss!sass!@talend/bootstrap-theme/src/theme/theme.scss';

setAddon(infoAddon);

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
