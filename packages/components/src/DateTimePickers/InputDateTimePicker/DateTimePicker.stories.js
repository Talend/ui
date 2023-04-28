import { action } from '@storybook/addon-actions';

import InputDateTimePicker from './InputDateTimePicker.component';

export default {
	title: 'Form/Controls/DatePicker/DateTime',

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
	<InputDateTimePicker
		id="my-date-picker"
		name="datetime"
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		value={new Date(2018, 4, 13, 12, 30, 44)}
	/>
);

export const TextInput = () => (
	<InputDateTimePicker
		id="my-date-picker"
		name="datetime"
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		value="2020-12-31 10:10"
	/>
);

export const DefaultTime = () => (
	<InputDateTimePicker
		id="my-date-picker"
		name="datetime"
		onChange={action('onChange')}
		defaultTimeValue={{
			hours: '03',
			minutes: '04',
			seconds: '00',
		}}
	/>
);

export const UTC = () => (
	<InputDateTimePicker
		id="my-datetime-picker"
		name="Datetime"
		onChange={action('onChange')}
		useUTC
	/>
);

export const Timezone = () => (
	<InputDateTimePicker
		id="my-datetime-picker"
		name="datetime"
		onChange={action('onChange')}
		value={1569340800000}
	/>
);
