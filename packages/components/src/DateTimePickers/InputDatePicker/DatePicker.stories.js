import React from 'react';
import { action } from '@storybook/addon-actions';
import isBefore from 'date-fns/is_before';
import startOfDay from 'date-fns/start_of_day';

import InputDatePicker from './InputDatePicker.component';

import DateManager from '../Date/Manager';
import DatePicker from '../Date/Picker';

export default {
	title: 'Form/Controls/DatePicker/Date',

	decorators: [
		story => (
			<form
				onSubmit={event => {
					event.persist();
					event.preventDefault();
					action('submit')(event);
				}}
			>
				{story()}
			</form>
		),
	],
};

export const Input = () => (
	<InputDatePicker
		id="my-date-picker"
		name="date"
		onChange={action('onChange')}
		onBlur={action('onBlur')}
	/>
);

export const Picker = () => (
	<div style={{ border: '1px solid black', width: '32rem' }}>
		<DateManager id="simple" onChange={action('onChange', { depth: 3 })}>
			<DatePicker />
		</DateManager>
	</div>
);

export const Utc = () => (
	<InputDatePicker id="my-date-picker" name="date" onChange={action('onChange')} useUTC />
);

Utc.story = {
	name: 'UTC',
};

export const Timezone = () => (
	<InputDatePicker
		id="my-date-picker"
		name="date"
		onChange={action('onChange')}
		timezone="Europe/Berlin"
	/>
);

export const CustomFormat = () => (
	<div>
		<p>
			Date picker can accept a custom date format if it's a composition of DD, MM, YYYY only.
			<br />
			Once date-fns parse() accept a format (scheduled for 2.0), we can remove this specific code
			and accept any format.
			<br />
			<br />
			Here we set date format to: DD/MM/YYYY. (default is YYYY-MM-DD)
		</p>
		<InputDatePicker
			id="my-date-picker"
			name="date"
			onChange={action('onChange')}
			dateFormat="DD/MM/YYYY"
		/>
	</div>
);

CustomFormat.story = {
	name: 'Custom format',
};

export const MinWidth = () => (
	<div>
		<p>Date picker a minimal width for the input</p>
		<InputDatePicker
			id="my-date-picker"
			name="date"
			onChange={action('onChange')}
			dateFormat="DD/MM/YYYY"
			minWidth={250}
		/>
	</div>
);

MinWidth.story = {
	name: 'min width',
};

export const ContainerOverflow = () => (
	<div style={{ height: 300, overflow: 'auto', border: 'solid', marginTop: 100 }}>
		<div
			style={{
				height: 400,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
			}}
		>
			<InputDatePicker id="my-date-picker-top-left" name="date1" onChange={action('onChange')} />
			<InputDatePicker id="my-date-picker-top-right" name="date2" onChange={action('onChange')} />
		</div>
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<InputDatePicker
				id="my-date-picker-bottom-left"
				name="date3"
				onBlur={action('onBlur')}
				onChange={action('onChange')}
			/>
			<InputDatePicker
				id="my-date-picker-bottom-right"
				name="date4"
				onChange={action('onChange')}
			/>
		</div>
	</div>
);

ContainerOverflow.story = {
	name: 'Container overflow',
};

export const DisabledDates = () => (
	<div>
		<p>
			Disabled dates are not allowed to be selected.
			<br />
			You can pass a <b>isDisabledChecker</b> function, if isDisabledChecker(date) returns true,
			then date will be disabled. If you input a date which is disabled, an "Invalid date" error
			will be thrown.
			<br />
			For example, this picker will disable past days:
			<pre>
				{`
<InputDatePicker
    ...
    isDisabledChecker={date => isBefore(date, startOfDay(new Date()))}
/>
`}
			</pre>
		</p>
		<InputDatePicker
			id="my-date-picker"
			name="date"
			onChange={action('onChange')}
			dateFormat="DD/MM/YYYY"
			isDisabledChecker={date => isBefore(date, startOfDay(new Date()))}
		/>
	</div>
);

DisabledDates.story = {
	name: 'Disabled dates',
};
