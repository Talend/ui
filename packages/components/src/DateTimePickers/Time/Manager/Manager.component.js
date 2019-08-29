import React from 'react';
import PropTypes from 'prop-types';

import { TimeContext } from '../Context';
import extractTime from '../time-extraction';

class ContextualManager extends React.Component {
	static displayName = 'Time.Manager';
	static propTypes = {
		children: PropTypes.node,
		onChange: PropTypes.func,
		useSeconds: PropTypes.bool,
		selectedTime: PropTypes.string,
	};

	static defaultProps = {
		useSeconds: false,
	}

	constructor(props) {
		super(props);

		this.state = extractTime(props.selectedTime, props.useSeconds);
		this.onChange = this.onChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	onChange(event, origin) {
		if (!this.props.onChange) {
			return;
		}
		const { errorMessage, time, textInput, errors } = this.state;
		this.props.onChange(event, { errors, errorMessage, time, textInput, origin });
	}

	onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractTime(textInput, this.props.useSeconds);
		this.setState({ previousErrors: this.state.errors, ...nextState }, () => {
			this.onChange(event, 'INPUT');
		});
	}

	onPickerChange(event, { textInput, time }) {
		const nextState = {
			time,
			textInput,
			errors: [],
			errorMessage: null,
		};

		this.setState({ previousErrors: this.state.errors, ...nextState }, () => {
			this.onChange(event, 'PICKER');
		});
	}

	render() {
		return (
			<TimeContext.Provider
				value={{
					time: {
						time: this.state.time,
						textInput: this.state.textInput,
					},

					inputManagement: {
						onChange: this.onInputChange,
					},

					pickerManagement: {
						onChange: this.onPickerChange,
					},
				}}
			>
				{this.props.children}
			</TimeContext.Provider>
		);
	}
}

export default ContextualManager;
