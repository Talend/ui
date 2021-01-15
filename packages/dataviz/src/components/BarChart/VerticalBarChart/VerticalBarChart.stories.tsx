import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import VerticalBarChart, { VerticalBarChartProps } from './VerticalBarChart.component';
import TooltipContent from '../../TooltipContent/TooltipContent.component';
import { getVerticalBarChartTooltip } from '../barChart.tooltip';

const Template: Story<VerticalBarChartProps> = args => <VerticalBarChart {...args} />;

export default {
	title: 'Dataviz/VerticalBarChart',
	component: VerticalBarChart,
	decorators: [
		ChartStory => (
			<div style={{ height: 200, width: 300 }}>
				<ChartStory />
			</div>
		),
	],
	args: {
		onBarClick: action('onClick'),
		dataFeature: 'my.data.feature',
	},
} as Meta<VerticalBarChartProps>;

export const NumberBarChart = Template.bind({});
NumberBarChart.args = {
	data: [
		{
			key: { min: 2000, max: 2100 },
			label: '[2000, 2100[',
			value: 200,
			filteredValue: 100,
		},
		{
			key: { min: 2100, max: 2200 },
			label: '[2100, 2200[',
			value: 400,
			filteredValue: 100,
		},
		{
			key: { min: 2200, max: 2300 },
			label: '[2200, 2300[',
			value: 400,
			filteredValue: 100,
		},
		{
			key: { min: 2300, max: 2400 },
			label: '[2300, 2400[',
			value: 400,
		},
		{
			key: { min: 2400, max: 2500 },
			label: '[2400, 2500[',
			value: 400,
			filteredValue: 100,
		},
		{
			key: { min: 2500, max: 2600 },
			label: '[2500, 2600[',
			value: 400,
			filteredValue: 400,
		},
	],
	getTooltipContent: entry => <TooltipContent entries={getVerticalBarChartTooltip(entry)} />,
};

export const DateBarChart = Template.bind({});
DateBarChart.args = {
	data: [
		{
			key: {
				min: 946681200000,
				max: 1262300400000,
			},
			label: '[2000, 2010[',
			value: 249,
			filteredValue: 40,
		},
		{
			key: {
				min: 1577833200000,
				max: 1262300400000,
			},
			label: '[2010, 2020[',
			value: 152,
			filteredValue: 75,
		},
		{
			key: { min: 1893452400000, max: 1577833200000 },
			label: '[2020, 2030[',
			value: 20,
			filteredValue: 20,
		},
	],
	showXAxis: true,
	getTooltipContent: entry => <TooltipContent entries={getVerticalBarChartTooltip(entry)} />,
};

export const MinBarSize = Template.bind({});
MinBarSize.args = {
	data: [
		{
			key: {
				min: 10,
				max: 20,
			},
			label: '',
			value: 1,
		},
		{
			key: {
				min: 20,
				max: 30,
			},
			label: '',
			value: 9999,
		},
	],
	getTooltipContent: () => <div />,
};
