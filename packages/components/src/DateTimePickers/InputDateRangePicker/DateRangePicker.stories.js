import { action } from '@storybook/addon-actions';

import InputDateRangePicker from './InputDateRangePicker.component';

import DateManager from '../Date/Manager';
import DatePicker from '../Date/Picker';

export default {
	title: 'Form/Controls/DatePicker/Date Range',

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
	<InputDateRangePicker
		id="my-date-picker"
		name="daterange"
		onBlur={action('onBlur')}
		onChange={action('onChange')}
	/>
);

export const Disabled = () => (
	<InputDateRangePicker
		disabled
		id="my-date-picker"
		name="daterange"
		onBlur={action('onBlur')}
		onChange={action('onChange')}
	/>
);

export const InputWithMinWidth = () => (
	<InputDateRangePicker
		id="my-date-picker"
		name="daterange"
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		minWidth={250}
	/>
);

export const Picker = () => (
	<div style={{ border: '1px solid black', width: 320 }}>
		<DateManager id="simple" onChange={action('onChange', { depth: 3 })}>
			<DatePicker selectedDate={new Date(2019, 9, 24)} endDate={new Date(2019, 9, 30)} />
		</DateManager>
	</div>
);

export const Inline = () => (
	<InputDateRangePicker
		id="my-date-picker"
		name="daterange"
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		inline
	/>
);
