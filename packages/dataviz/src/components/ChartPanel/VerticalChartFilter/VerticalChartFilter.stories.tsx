import React from 'react';
import { Meta, Story } from '@storybook/react';
import VerticalChartFilter, { VerticalChartFilterProps } from './VerticalChartFilter.component';
import { DateRangeHandler, NumberRangeHandler } from '../../RangeFilter';

const Template: Story<VerticalChartFilterProps> = args => <VerticalChartFilter {...args} />;

export default {
	title: 'Dataviz/VerticalChartFilter',
	component: VerticalChartFilter,
	decorators: [
		MyStory => (
			<div style={{ width: 350, height: 300 }}>
				<MyStory />
			</div>
		),
	],
} as Meta<VerticalChartFilterProps>;

export const Number = Template.bind({});
Number.args = {
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
	activeRange: {
		min: 2200,
		max: 2500,
	},
	rangeLimits: {
		min: 2000,
		max: 2600,
	},
	rangeHandler: NumberRangeHandler,
};

export const Date = Template.bind({});
Date.args = {
	data: [
		{
			key: {
				min: 946681200000,
				max: 1262300400000,
			},
			label: '[2000, 2010[',
			value: 249,
			filteredValue: 200,
		},
		{
			key: {
				min: 1262300400000,
				max: 1577833200000,
			},
			label: '[2010, 2020[',
			value: 152,
			filteredValue: 75,
		},
		{
			key: { min: 1577833200000, max: 1893452400000 },
			label: '[2020, 2030[',
			value: 20,
			filteredValue: 20,
		},
	],
	activeRange: {
		min: 1262300400000,
		max: 1577833200000,
	},
	rangeLimits: { min: 946681200000, max: 1893452400000 },
	rangeHandler: DateRangeHandler,
};
