import React from 'react';
import { Meta, Story } from '@storybook/react';
import TooltipContent, { TooltipContentProps } from './TooltipContent.component';

const Template: Story<TooltipContentProps> = args => <TooltipContent {...args} />;

export default {
	title: 'Dataviz/TooltipContent',
	component: TooltipContent,
	decorators: [
		MyStory => (
			<div style={{ width: 200 }}>
				<MyStory />
			</div>
		),
	],
	args: {
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
	},
} as Meta;

export const Default = Template.bind({});

export const Pattern = Template.bind({});
Pattern.args = {
	chartStyle: TooltipContent.ChartStyle.PATTERN,
};
