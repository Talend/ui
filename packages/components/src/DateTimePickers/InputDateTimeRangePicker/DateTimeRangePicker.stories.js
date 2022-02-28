import React from 'react';
import { action } from '@storybook/addon-actions';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';

export default {
	title: 'Form/Controls/DatePicker/Date Time Range',

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
	<InputDateTimeRangePicker
		id="my-datetime-range-picker"
		onChange={action('onChange')}
		onBlur={action('onBlur')}
		useSeconds
	/>
);

export const Disabled = () => (
	<InputDateTimeRangePicker
		disabled
		id="my-datetime-range-picker"
		onChange={action('onChange')}
		onBlur={action('onBlur')}
		useSeconds
	/>
);

export const MinWidth = () => (
	<InputDateTimeRangePicker
		id="my-datetime-range-picker"
		onChange={action('onChange')}
		onBlur={action('onBlur')}
		useSeconds
		minWidthDate={200}
		minWidthTime={150}
	/>
);

export const DefaultTime = () => (
	<div>
		<InputDateTimeRangePicker
			id="my-datetime-range-picker"
			onChange={action('onChange')}
			defaultTimeStart={{
				hours: '00',
				minutes: '00',
				seconds: '00',
			}}
			defaultTimeEnd={{
				hours: '23',
				minutes: '59',
				seconds: '59',
			}}
			useSeconds
		/>
	</div>
);

export const Inline = () => (
	<div>
		<InputDateTimeRangePicker
			id="my-datetime-range-picker"
			onChange={action('onChange')}
			onBlur={action('onBlur')}
			inline
		/>
	</div>
);
