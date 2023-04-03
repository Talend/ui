import { Fragment } from 'react';
import ActionIntercom from './Intercom.component';

const config = { app_id: 'fyq3wodw', email: 'toto@gmail.com' };

export default {
	title: 'Messaging & Communication/Intercom',
};

export const Default = () => (
	<Fragment>
		<ActionIntercom id="intercom" config={config} />
	</Fragment>
);
