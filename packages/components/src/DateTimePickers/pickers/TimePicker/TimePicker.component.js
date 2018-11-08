import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';
import DebounceInput from 'react-debounce-input';

import theme from './TimePicker.scss';

const HOURS = 'HOURS';
const MINUTES = 'MINUTES';

function strToNumber(value) {
	if (value) {
		const num = Number(value);
		return isNaN(num) ? value : num;
	}
	return undefined;
}

class TimePicker extends React.PureComponent {
	constructor(props) {
		super(props);
		const id = uuid.v4();
		this.hourId = `${id}-hour`;
		this.minuteId = `${id}-minute`;
		this.onChange = this.onChange.bind(this);
	}

	onChange(event, field) {
		const inputValue = strToNumber(event.target.value);
		const newValue = { ...this.props.value };
		if (field === HOURS) {
			newValue.hours = inputValue;
		} else if (field === MINUTES) {
			newValue.minutes = inputValue;
		}
		this.props.onChange(event, newValue);
	}

	render() {
		const tabIndex = this.props.allowFocus ? 0 : -1;

		return (
			<div className={classNames('tc-date-picker-time', theme['time-picker'])}>
				<legend>Time</legend>
				<label htmlFor={this.hourId} className="sr-only">
					Hours
				</label>
				<DebounceInput
					id={this.hourId}
					className={theme['time-input']}
					value={this.props.value.hours}
					tabIndex={tabIndex}
					onChange={event => this.onChange(event, HOURS)}
				/>
				<hr />
				<label htmlFor={this.minuteId} className="sr-only">
					Minutes
				</label>
				<DebounceInput
					id={this.minuteId}
					className={theme['time-input']}
					value={this.props.value.minutes}
					tabIndex={tabIndex}
					onChange={event => this.onChange(event, MINUTES)}
				/>
			</div>
		);
	}
}

TimePicker.defaultProps = {
	value: {},
};

TimePicker.propTypes = {
	allowFocus: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.shape({
		hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		minutes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	}),
};

export default TimePicker;
