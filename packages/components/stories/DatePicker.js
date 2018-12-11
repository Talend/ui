import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconsProvider } from '../src/index';

import InputDateTimePicker, { DateTimePicker } from '../src/DateTimePickers';

class TestPickerWrapper extends React.Component {
	static propTypes = {
		...InputDateTimePicker.propTypes,
	};

	constructor(props) {
		super(props);

		this.state = {
			inputEvalValue: '',
			selectedDateTime: this.props.selectedDateTime,
		};
		this.onSubmitEval = this.onSubmitEval.bind(this);
		this.onChangeEvalInput = this.onChangeEvalInput.bind(this);
	}

	onSubmitEval() {
		this.setState(prevState => ({
			// eslint-disable-next-line no-eval
			selectedDateTime: eval(prevState.inputEvalValue),
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
						Text to eval for updating 'selectedDateTime' prop
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
				<InputDateTimePicker
					{...this.props}
					selectedDateTime={this.state.selectedDateTime}
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
				Default date picker doesn't include time<br />
				It comes with classical keyboard gesture.
			</p>
			<TestPickerWrapper
				id="my-date-picker"
				selectedDateTime={new Date(2018, 4, 13, 12, 30)}
				onChange={action('onChange')}
				name="Datetime"
			/>
		</div>
	))
	.add('Date picker - time', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker with time</h1>
			<p>You can require time with a simple "useTime" props.</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	useTime
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(2018, 4, 13, 12, 30, 44)}
					useTime
				/>
			</form>
		</div>
	))
	.add('Date picker - seconds', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker with seconds</h1>
			<p>
				By default, time is only hours and minutes (HH:mm). You can require seconds with a simple
				"useSeconds" props.
			</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	useTime
	useSeconds
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(2018, 4, 13, 12, 30, 44)}
					useSeconds
					useTime
				/>
			</form>
		</div>
	))
	.add('Date picker - UTC', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker in UTC TZ</h1>
			<p>You can require to work with only UTC dates (input and output).</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	useTime
	useUTC
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
					useTime
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
<InputDateTimePicker
	id="my-date-picker"
	...
	dateFormat="DD/MM/YYYY"
/>
			`}</pre>
			<IconsProvider />
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(2018, 4, 13, 12, 30)}
					dateFormat="DD/MM/YYYY"
					useTime
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
							<DateTimePicker onSubmit={action('onSubmit')} />
						</div>
					</div>

					<div>
						<h2>Date time</h2>
						<div style={blockStyle}>
							<DateTimePicker onSubmit={action('onSubmit')} useTime />
						</div>
					</div>

					<div>
						<h2>Date time seconds</h2>
						<div style={blockStyle}>
							<DateTimePicker onSubmit={action('onSubmit')} useTime useSeconds />
						</div>
					</div>

					<div>
						<h2>Date time seconds UTC</h2>
						<div style={blockStyle}>
							<DateTimePicker onSubmit={action('onSubmit')} useTime useSeconds useUTC />
						</div>
					</div>
				</div>
			</div>
		);
	});
