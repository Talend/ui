import { Meta, Story } from '@storybook/react';
import KeyValueTooltip, { KeyValueTooltipProps } from './KeyValueTooltip.component';

const Template: Story<KeyValueTooltipProps> = args => <KeyValueTooltip {...args} />;

export default {
	title: 'Dataviz/KeyValueTooltip',
	component: KeyValueTooltip,
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
				value: '  5   0  ',
			},
			{
				key: 'Second line',
				value: '50',
			},
		],
	},
	parameters: {
		chromatic: {
			// To avoid issues with charts, we'll need to improve this later on
			diffThreshold: 0.6,
		},
	},
} as Meta;

export const Default = Template.bind({});

export const Pattern = Template.bind({});
Pattern.args = {
	chartStyle: KeyValueTooltip.ChartStyle.PATTERN,
};
