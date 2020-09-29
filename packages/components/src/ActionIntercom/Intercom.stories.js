import React from 'react';
import { storiesOf } from '@storybook/react';
import IconsProvider from '../IconsProvider';
import ActionIntercom from './Intercom.component';

const config = { app_id: 'fyq3wodw', email: 'toto@gmail.com' };

storiesOf('Messaging & Communication/Intercom', module).add('default', () => (
	<React.Fragment>
		<IconsProvider />
		<ActionIntercom id="intercom" config={config} />
	</React.Fragment>
));
