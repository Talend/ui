import { Fragment } from 'react';
import ActionIntercom from './Intercom.component';

const config = { app_id: 'fyq3wodw', email: 'toto@gmail.com' };

const meta = {
	title: 'Components/Messaging & Communication/Intercom',
	component: ActionIntercom,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => (
		<Fragment>
			<ActionIntercom id="intercom" config={config} />
		</Fragment>
	),
};
