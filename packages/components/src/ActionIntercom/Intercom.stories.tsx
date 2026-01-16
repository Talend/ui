import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';
import ActionIntercom from './Intercom.component';

const config = { app_id: 'fyq3wodw', email: 'toto@gmail.com' };

type Story = StoryObj<typeof ActionIntercom>;

const meta: Meta<typeof ActionIntercom> = {
	title: 'Components/Messaging & Communication/Intercom',
	component: ActionIntercom,
	tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
	render: () => (
		<Fragment>
			<ActionIntercom id="intercom" config={config} />
		</Fragment>
	),
};
