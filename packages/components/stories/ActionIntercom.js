import React from 'react';
import talendIcons from '@talend/icons/dist/react';
import { storiesOf } from '@storybook/react';
import IconsProvider from '../src/IconsProvider';
import ActionIntercom from '../src/ActionIntercom';

const icons = {
	'talend-bubbles': talendIcons['talend-bubbles'],
	'talend-cross': talendIcons['talend-cross'],
};
const config = { app_id: 'fyq3wodw' };

storiesOf('ActionIntercom', module).add('default', () => (
	<React.Fragment>
		<IconsProvider defaultIcons={icons} />
		<ActionIntercom id="intercom" config={config} />
	</React.Fragment>
));
