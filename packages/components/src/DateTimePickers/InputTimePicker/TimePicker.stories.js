import { action } from '@storybook/addon-actions';

import TimePicker from '../pickers/TimePicker';
import InputTimePicker from './InputTimePicker.component';

export default {
	title: 'Components/Form - Controls/DatePicker/Time',

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

export const Input = () => {
	return (
		<div>
			<div>
				<p>Default</p>
				<InputTimePicker onChange={action('onChange')} onBlur={action('onBlur')} />
			</div>
			<div>
				<p>disabled</p>
				<InputTimePicker disabled onChange={action('onChange')} onBlur={action('onBlur')} />
			</div>
			<div>
				<p>minWidth</p>
				<InputTimePicker onChange={action('onChange')} onBlur={action('onBlur')} minWidth={200} />
			</div>
		</div>
	);
};

export const Picker = () => {
	const containerStyle = {
		overflow: 'auto',
		width: '4.375rem',
		height: '10.625rem',
		marginRight: 60,
	};
	return (
		<div style={{ display: 'flex', alignItems: 'flex-start' }}>
			<div>
				<p>Default</p>
				<div style={containerStyle}>
					<TimePicker onChange={action('onChange')} />
				</div>
			</div>
			<div>
				<p>Custom interval</p>
				<div style={containerStyle}>
					<TimePicker onChange={action('onChange')} interval={120} />
				</div>
			</div>
			<div>
				<p>Seconds</p>
				<div style={containerStyle}>
					<TimePicker onChange={action('onChange')} useSeconds />
				</div>
			</div>
			<div>
				<p>Selected time</p>
				<div style={containerStyle}>
					<TimePicker onChange={action('onChange')} textInput="20:00" />
				</div>
			</div>
		</div>
	);
};

export const InitialTime = () => <InputTimePicker onChange={action('onChange')} value="12:00" />;

export const Timezone = () => (
	<InputTimePicker onChange={action('onChange')} value="12:00" timezone="Europe/Berlin" />
);
