import React from 'react';
import PropTypes from 'prop-types';

import { TimeContext } from '../Context';
import extractTime, { getTimeFormat } from '../time-extraction';

class ContextualManager extends React.Component {
	static displayName = 'Time.Manager';
	static propTypes = {
		children: PropTypes.node,
		onChange: PropTypes.func,
		useSeconds: PropTypes.bool,
		timezone: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	};

	static defaultProps = {
		useSeconds: false,
	};

	constructor(props) {
		super(props);

		this.state = extractTime(props.value, props.useSeconds);
		this.onChange = this.onChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	onChange(event, origin) {
		if (!this.props.onChange) {
			return;
		}
		this.props.onChange(event, { ...this.state, origin });
	}

	onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractTime(textInput, this.props.useSeconds);
		this.setState(nextState, () => {
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

		this.setState(nextState, () => {
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
						timezone: this.props.timezone,
					},

					inputManagement: {
						onChange: this.onInputChange,
						placeholder: getTimeFormat(this.props.useSeconds),
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
