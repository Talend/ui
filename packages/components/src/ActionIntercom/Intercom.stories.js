import React from 'react';
import talendIcons from '@talend/icons/dist/react';
import { storiesOf } from '@storybook/react';
import IconsProvider from '../IconsProvider';
import ActionIntercom from './Intercom.component';

const icons = {
	'talend-bubbles': talendIcons['talend-bubbles'],
	'talend-cross': talendIcons['talend-cross'],
};
const config = { app_id: 'fyq3wodw' };

storiesOf('Components/Specific Features/Intercom', module).add('default', () => (
	<React.Fragment>
		<IconsProvider defaultIcons={icons} />
		<ActionIntercom id="intercom" config={config} />
	</React.Fragment>
));
