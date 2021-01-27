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
import { IntegerRangeHandler } from './handlers/IntegerRangeHandler/IntegerRangeHandler';

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

export const IntegerRangeFilter = Template.bind({});
IntegerRangeFilter.args = {
	range: {
		min: 1,
		max: 6,
	},
	limits: {
		min: 1,
		max: 6,
	},
	...IntegerRangeHandler,
};

export const NumberRangeFilter = Template.bind({});
NumberRangeFilter.args = {
	range: {
		min: 2177.87,
		max: 9530.28,
	},
	limits: {
		min: 2177.87,
		max: 9530.28,
	},
	...NumberRangeHandler,
};

export const BigNumberRangeFilter = Template.bind({});
BigNumberRangeFilter.args = {
	range: {
		min: 131035911,
		max: 831035920,
	},
	limits: {
		min: 131035911,
		max: 831035920,
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
