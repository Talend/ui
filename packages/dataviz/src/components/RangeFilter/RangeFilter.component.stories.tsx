import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RangeFilter, { RangeFilterProps } from './RangeFilter.component';
import {
	DateRangeHandler,
	DateTimeRangeHandler,
	NumberRangeHandler,
	TimeRangeHandler,
} from './handlers';

const Template: Story<RangeFilterProps> = args => {
	const [currentRange, setCurrentRange] = useState(args.range);
	return (
		<RangeFilter
			{...args}
			range={currentRange}
			onSliderChange={range => {
				action('onSliderChange')(range);
				setCurrentRange(range);
			}}
			onAfterChange={range => {
				action('onAfterChange')(range);
				setCurrentRange(range);
			}}
		/>
	);
};

export default {
	title: 'Dataviz/RangeFilter',
	component: RangeFilter,
	decorators: [
		MyStory => {
			return (
				<div style={{ width: 350, height: 300 }}>
					<MyStory />
				</div>
			);
		},
	],
} as Meta<RangeFilterProps>;

export const NumberRangeFilter = Template.bind({});
NumberRangeFilter.args = {
	range: {
		min: 2200,
		max: 2500,
	},
	limits: {
		min: 2000,
		max: 2600,
	},
	...NumberRangeHandler,
};

export const DateRangeFilter = Template.bind({});
DateRangeFilter.args = {
	range: {
		min: 1262300400000,
		max: 1577833200000,
	},
	limits: { min: 946681200000, max: 1893452400000 },
	...DateRangeHandler,
};

export const DateTimeRangeFilter = Template.bind({});
DateTimeRangeFilter.args = {
	range: {
		min: 1262300430000,
		max: 1577833230000,
	},
	limits: { min: 946681200000, max: 1893452400000 },
	...DateTimeRangeHandler,
};

export const TimeRangeFilter = Template.bind({});
TimeRangeFilter.args = {
	range: {
		min: 37304,
		max: 67304,
	},
	limits: { min: 37304, max: 67304 },
	...TimeRangeHandler,
};
