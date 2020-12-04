import React from 'react';
import { Meta, Story } from '@storybook/react';
import Tooltip, { TooltipProps } from './Tooltip.component';

const Template: Story<TooltipProps> = args => <Tooltip {...args} />;

export default {
	title: 'Dataviz/Tooltip',
	component: Tooltip,
	decorators: [
		MyStory => (
			<div style={{ width: 200 }}>
				<MyStory />
			</div>
		),
	],
	args: {},
} as Meta;

export const Default = Template.bind({});
Default.args = {
	entries: [
		{
			key: 'First line',
			value: '50',
		},
		{
			key: 'Second line',
			value: '50',
		},
	],
};
