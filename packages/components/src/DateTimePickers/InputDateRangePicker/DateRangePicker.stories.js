import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputDateRangePicker from './InputDateRangePicker.component';

import DateManager from '../Date/Manager';
import DatePicker from '../Date/Picker';

storiesOf('Form/Controls/DatePicker/Date Range', module)
	.addDecorator(story => (
		<form
			onSubmit={event => {
				event.persist();
				event.preventDefault();
				action('submit')(event);
			}}
		>
			{story()}
		</form>
	))
	.add('Input', () => (
		<InputDateRangePicker
			id="my-date-picker"
			name="daterange"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
		/>
	))
	.add('disabled', () => (
        <InputDateRangePicker
            disabled
            id="my-date-picker"
            name="daterange"
            onBlur={action('onBlur')}
            onChange={action('onChange')}
        />
    ))
	.add('Input with minWidth', () => (
		<InputDateRangePicker
			id="my-date-picker"
			name="daterange"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			minWidth={250}
		/>
	))
	.add('Picker', () => (
		<div style={{ border: '1px solid black', width: 320 }}>
			<DateManager id="simple" onChange={action('onChange', { depth: 3 })}>
				<DatePicker selectedDate={new Date(2019, 9, 24)} endDate={new Date(2019, 9, 30)} />
			</DateManager>
		</div>
	));
