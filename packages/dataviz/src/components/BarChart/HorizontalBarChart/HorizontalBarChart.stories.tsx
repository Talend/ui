import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HorizontalBarChart, { HorizontalBarChartProps } from './HorizontalBarChart.component';
import { ChartEntry, ChartStyle, ValueType } from '../barChart.types';
import { getHorizontalBarChartTooltip } from '../barChart.tooltip';
import TooltipContent from '../../TooltipContent/TooltipContent.component';

const data: ChartEntry<string>[] = [
	{
		key: 'Entry fully matching filter',
		value: 2145,
		filteredValue: 2145,
	},
	{
		key: 'Entry not matching filter',
		value: 1500,
		filteredValue: 0,
	},
	{
		key: 'Entry partially matching filter',
		value: 3200,
		filteredValue: 2080,
	},
];

const Template: Story<HorizontalBarChartProps> = args => <HorizontalBarChart {...args} />;

export default {
	title: 'Dataviz/HorizontalBarChart',
	component: HorizontalBarChart,
	decorators: [
		ChartStory => (
			<div style={{ height: 300, width: 300 }}>
				<ChartStory />
			</div>
		),
	],
	args: {
		onBarClick: action('onClick'),
		getTooltipContent: entry => (
			<TooltipContent entries={getHorizontalBarChartTooltip(entry, ValueType.OCCURRENCES)} />
		),
	},
} as Meta<HorizontalBarChartProps>;

export const ProfileChartWithFilter = Template.bind({});
ProfileChartWithFilter.args = {
	data,
	chartStyle: ChartStyle.VALUE,
};

export const PatternChart = Template.bind({});
PatternChart.args = {
	data,
	chartStyle: ChartStyle.PATTERN,
};

export const TooManyBars = Template.bind({});
TooManyBars.parameters = {
	docs: {
		storyDescription: 'Bars should not shrink',
	},
};
TooManyBars.args = {
	chartStyle: ChartStyle.PATTERN,
	data: [...Array(10)].flatMap(() => data),
};

export const SpecialValues = Template.bind({});
SpecialValues.parameters = {
	docs: {
		storyDescription: 'Should show empty, small values and trailing spaces',
	},
};
SpecialValues.args = {
	chartStyle: ChartStyle.PATTERN,
	data: [
		{
			key: 'Bar should be at least 3px long',
			value: 1,
		},
		{
			value: 50,
			key: '',
		},
		{
			value: 50,
			key: '   trailing spaces',
		},
	],
};
