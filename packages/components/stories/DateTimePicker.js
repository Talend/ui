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
			<div>
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
					<button onClick={this.onSubmitEval}>Update</button>
				</div>
				<br />
				<InputDateTimePicker
					{...this.props}
					selectedDateTime={this.state.selectedDateTime}
					onChange={action('onChange (error message, dateTime)')}
					name="Datetime"
				/>
			</div>
		);
	}
}

storiesOf('DateTimePicker', module)
	.add('InputDateTimePicker', () => (
		<div>
			<h1>InputDateTimePicker</h1>
			<IconsProvider />

			<div>
				<TestPickerWrapper
					selectedDateTime={new Date(2018, 4, 13, 12, 30)}
					onChange={action('onChange (error message, dateTime)')}
					name="Datetime"
				/>
			</div>
		</div>
	))
	.add('DateTimePicker', () => (
		<div>
			<h1>DateTimePicker</h1>
			<IconsProvider />
			<ul>
				<li>Width is defined by the parent (here fixed to 320px) but is responsive </li>
				<li>Height is responsive relatively to the default font-size</li>
				<li>The outer border style (black) is here just as visual
					shape indication, it's not part of the component rendered</li>
			</ul>

			<div style={{ width: '320px', border: '1px solid black' }}>
				<DateTimePicker
					onSubmit={action('onSubmit (Date and time)')}
				/>
			</div>
		</div>
	));
