import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconsProvider } from '../src/index';

import InputDateTimePicker, { DateTime } from '../src/DateTimePickers';

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
			<TestPickerWrapper id="my-date-picker" onChange={action('onChange')} name="Datetime" />
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
	.add('Date picker - form mode', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker in form mode</h1>
			<p>
				Date picker is in form mode.You can switch to form mode with a simple "formMode" props.
				<br />
				It means that the changes are taken into account only with a form validation (submit
				button).
				<br />
				Any other picker close will revert the value.
			</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	formMode
/>
			`}</pre>
			<div style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					onChange={action('onChange')}
					name="Datetime"
					formMode
				/>
			</div>
			<div style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					useTime
					formMode
					required={false}
					useSeconds
				/>
			</div>
		</div>
	))
	.add('Date picker - no input', () => {
		const blockStyle = { width: 320, height: 360, border: '1px solid black', marginRight: '1rem' };
		return (
			<div>
				<h1>DatePicker without input</h1>
				<IconsProvider />
				<ul>
					<li>The minimum width is 290px, and minimum height is 352px. </li>
					<li>The width and height can be defined by the parent. </li>
					<li>If no width or height are set explicitly, it will use minimum width and height by default.</li>
					<li>
						The outer border style (black) is here just as visual shape indication, it's not part of
						the component rendered
					</li>
				</ul>

				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div>
						<h2>Date</h2>
						<div style={blockStyle}>
							<DateTime.Manager id="simple" onChange={action('onChange')}>
								<DateTime.Picker />
							</DateTime.Manager>
						</div>
					</div>

					<div>
						<h2>Date time</h2>
						<div style={blockStyle}>
							<DateTime.Manager id="time" onChange={action('onChange')} useTime>
								<DateTime.Picker />
							</DateTime.Manager>
						</div>
					</div>

					<div>
						<h2>Date time seconds</h2>
						<div style={blockStyle}>
							<DateTime.Manager id="time-seconds" onChange={action('onChange')} useTime useSeconds>
								<DateTime.Picker />
							</DateTime.Manager>
						</div>
					</div>

					<div>
						<h2>Date time seconds UTC</h2>
						<div style={blockStyle}>
							<DateTime.Manager id="utc" onChange={action('onChange')} useTime useSeconds useUTC>
								<DateTime.Picker />
							</DateTime.Manager>
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
						<InputDateTimePicker
							id="my-date-picker-top-left"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
							useTime
						/>
					</form>
					<form style={{ width, float: 'right' }}>
						<InputDateTimePicker
							id="my-date-picker-top-right"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
							useTime
						/>
					</form>
					<div style={{ height: 600 }} />
					<form style={{ width, float: 'left' }}>
						<InputDateTimePicker
							id="my-date-picker-bottom-left"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
							useTime
						/>
					</form>
					<form style={{ width, float: 'right' }}>
						<InputDateTimePicker
							id="my-date-picker-bottom-right"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
							useTime
						/>
					</form>
				</div>
			</div>
		);
	});
