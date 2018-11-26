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

storiesOf('DateTimePicker', module)
	.add('InputDateTimePicker', () => (
		<div>
			<h1>InputDateTimePicker</h1>
			<IconsProvider />
			<TestPickerWrapper
				id="my-date-picker"
				selectedDateTime={new Date(2018, 4, 13, 12, 30)}
				onChange={action('onChange')}
				name="Datetime"
			/>
		</div>
	))
	.add('InputDateTimePicker - custom format', () => (
		<div>
			<h1>InputDateTimePicker with custom format</h1>
			<p>
				Date picker can accept a custom date format if it's a composition of DD, MM, YYYY only.
				<br />
				Once date-fns parse() accept a format (scheduled for 2.0), we can remove this specific code
				and accept any format.
				<br />
				<br />
				Here we set date format to: DD/MM/YYYY. (default is YYYY-MM-DD)
			</p>
			<IconsProvider />
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(2018, 4, 13, 12, 30)}
					dateFormat="DD/MM/YYYY"
				/>
			</form>
		</div>
	))
	.add('InputDateTimePicker with seconds', () => (
		<div>
			<h1>InputDateTimePicker with seconds</h1>
			<IconsProvider />
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					selectedDateTime={new Date(2018, 4, 13, 12, 30, 44)}
					useSeconds
				/>
			</form>
		</div>
	))
	.add('DateTimePicker', () => (
		<div>
			<h1>DateTimePicker</h1>
			<IconsProvider />
			<ul>
				<li>Width is defined by the parent (here fixed to 320px) but is responsive </li>
				<li>Height is responsive relatively to the default font-size</li>
				<li>
					The outer border style (black) is here just as visual shape indication, it's not part of
					the component rendered
				</li>
			</ul>

			<div style={{ width: 320, border: '1px solid black' }}>
				<DateTimePicker onSubmit={action('onSubmit')} />
			</div>
		</div>
	));
