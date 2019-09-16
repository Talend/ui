import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconsProvider } from '../src/index';

import { TimePicker } from '../src/DateTimePickers/pickers/TimePicker/TimePicker.component';
import DateManager from '../src/DateTimePickers/Date/Manager';
import DatePicker from '../src/DateTimePickers/Date/Picker';
import InputDateTimePicker from '../src/DateTimePickers';
import InputTimePicker from '../src/DateTimePickers/InputTimePicker';
import InputDatePicker from '../src/DateTimePickers/InputDatePicker';

class TestPickerWrapper extends React.Component {
	static propTypes = {
		...InputDatePicker.propTypes,
	};

	constructor(props) {
		super(props);

		this.state = {
			inputEvalValue: '',
			value: this.props.value,
		};
		this.onSubmitEval = this.onSubmitEval.bind(this);
		this.onChangeEvalInput = this.onChangeEvalInput.bind(this);
	}

	onSubmitEval() {
		this.setState(prevState => ({
			// eslint-disable-next-line no-eval
			value: eval(prevState.inputEvalValue),
		}));
	}

	onChangeEvalInput(event) {
		this.setState({
			inputEvalValue: event.target.value,
		});
	}
	render() {
		return (
			<form
				onSubmit={event => {
					event.preventDefault();
					action('submit');
				}}
				style={{ width: 320 }}
			>
				<div>
					<label htmlFor="TestWrapper_storybook_eval-input">
						Text to eval for updating 'value' prop
					</label>
					<br />
					<input
						id="TestWrapper_storybook_eval-input"
						type="text"
						onChange={this.onChangeEvalInput}
						value={this.state.inputEvalValue}
					/>
					<button onClick={this.onSubmitEval} type="button">
						Update
					</button>
				</div>
				<br />
				<InputDatePicker
					{...this.props}
					value={this.state.value}
					onChange={action('onChange')}
					onBlur={action('onBlur')}
					name="Datetime"
				/>
			</form>
		);
	}
}

storiesOf('DatePicker', module)
	.add('Date picker', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker</h1>
			<p>
				Default date picker
				<br />
				It comes with classical keyboard gesture.
			</p>
			<TestPickerWrapper id="my-date-picker" onChange={action('onChange')} name="Datetime" />
		</div>
	))
	.add('Date picker - UTC', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker in UTC TZ</h1>
			<p>You can require to work with only UTC dates (input and output).</p>
			<pre>{`
<InputDatePicker
	id="my-date-picker"
	...
	useUTC
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDatePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					value={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
					useUTC
				/>
			</form>
		</div>
	))
	.add('Date picker - custom format', () => (
		<div>
			<h1>DatePicker with custom format</h1>
			<p>
				Date picker can accept a custom date format if it's a composition of DD, MM, YYYY only.
				<br />
				Once date-fns parse() accept a format (scheduled for 2.0), we can remove this specific code
				and accept any format.
				<br />
				<br />
				Here we set date format to: DD/MM/YYYY. (default is YYYY-MM-DD)
			</p>
			<pre>{`
<InputDatePicker
	id="my-date-picker"
	...
	dateFormat="DD/MM/YYYY"
/>
			`}</pre>
			<IconsProvider />
			<form style={{ width: 320 }}>
				<InputDatePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					value={new Date(2018, 4, 13, 12, 30)}
					dateFormat="DD/MM/YYYY"
				/>
			</form>
		</div>
	))
	.add('Date picker - no input', () => {
		const blockStyle = { width: 320, border: '1px solid black', marginRight: '1rem' };
		return (
			<div>
				<h1>DatePicker without input</h1>
				<IconsProvider />
				<ul>
					<li>Width is defined by the parent (here fixed to 320px) but is responsive </li>
					<li>Height is responsive relatively to the default font-size</li>
					<li>
						The outer border style (black) is here just as visual shape indication, it's not part of
						the component rendered
					</li>
				</ul>

				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div>
						<h2>Date</h2>
						<div style={blockStyle}>
							<DateManager id="simple" onChange={action('onChange')}>
								<DatePicker />
							</DateManager>
						</div>
					</div>

					<div>
						<h2>Date time</h2>
						<div style={blockStyle}>
							<DateManager id="time" onChange={action('onChange')}>
								<DatePicker />
							</DateManager>
						</div>
					</div>

					<div>
						<h2>Date time seconds</h2>
						<div style={blockStyle}>
							<DateManager id="time-seconds" onChange={action('onChange')}>
								<DatePicker />
							</DateManager>
						</div>
					</div>

					<div>
						<h2>Date time seconds UTC</h2>
						<div style={blockStyle}>
							<DateManager id="utc" onChange={action('onChange')} useUTC>
								<DatePicker />
							</DateManager>
						</div>
					</div>
				</div>
			</div>
		);
	})
	.add('Date picker - parent with fixed height', () => {
		const width = 150;
		return (
			<div>
				<IconsProvider />
				<h1>DatePicker with fixed-height parent</h1>
				<div style={{ height: 300, overflow: 'auto', border: 'solid' }}>
					<form style={{ width, float: 'left' }}>
						<InputDatePicker
							id="my-date-picker-top-left"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
					<form style={{ width, float: 'right' }}>
						<InputDatePicker
							id="my-date-picker-top-right"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
					<div style={{ height: 600 }} />
					<form style={{ width, float: 'left' }}>
						<InputDatePicker
							id="my-date-picker-bottom-left"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
					<form style={{ width, float: 'right' }}>
						<InputDatePicker
							id="my-date-picker-bottom-right"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
				</div>
			</div>
		);
	})
	.add('Time picker - no input', () => {
		const containerStyle = {
			overflow: 'scroll',
			width: '7rem',
			height: '17rem',
			boxShadow: '0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.2)',
			marginRight: 60,
		};
		const onSubmit = action('onSubmit');
		return (
			<div>
				<h1>TimePicker without input</h1>
				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div>
						<p>default range</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} />
						</div>
					</div>
					<div>
						<p>range 120 minutes</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} interval={120} />
						</div>
					</div>
					<div>
						<p>use secconds</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} useSeconds />
						</div>
					</div>
					<div>
						<p>with textInput</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} textInput="20:00" />
						</div>
					</div>
				</div>
			</div>
		);
	})
	.add('Time picker - with input', () => (
		<div>
			<h1>TimePicker with input</h1>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<div style={{ width: '7rem', marginRight: 60 }}>
					<p>with input</p>
					<form>
						<InputTimePicker onChange={action('onChange')} />
					</form>
				</div>
				<div style={{ width: '7rem' }}>
					<p>with initial selectedTime</p>
					<form>
						<InputTimePicker onChange={action('onChange')} value="12:00" />
					</form>
				</div>
			</div>
		</div>
	))
	.add('DateTime picker', () => (
		<div>
			<IconsProvider />
			<h1>DateTimePicker</h1>
			<p>datetime picker</p>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(2018, 4, 13, 12, 30, 44)}
				/>
			</form>
		</div>
	))
	.add('DateTime picker - UTC', () => (
		<div>
			<IconsProvider />
			<h1>DateTimePicker in UTC TZ</h1>
			<p>You can require to work with only UTC datetime (input and output).</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	useUTC
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-datetime-picker"
					name="Datetime"
					onChange={action('onChange')}
					selectedDateTime={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
					useUTC
				/>
			</form>
		</div>
	));
