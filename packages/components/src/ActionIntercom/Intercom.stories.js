import React from 'react';
import ActionIntercom from './Intercom.component';

const config = { app_id: 'fyq3wodw', email: 'toto@gmail.com' };

export default {
	title: 'Messaging & Communication/Intercom',
};

export const Default = () => (
	<React.Fragment>
		<ActionIntercom id="intercom" config={config} />
	</React.Fragment>
);

Default.story = {
	name: 'default',
};
