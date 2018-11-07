import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';
import DebounceInput from 'react-debounce-input';

import theme from './TimePicker.scss';

const HOURS = 'HOURS';
const MINUTES = 'MINUTES';

class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		const id = uuid.v4();
		this.hourId = `${id}-hour`;
		this.minuteId = `${id}-minute`;
		this.getFieldsValue = this.getFieldsValue.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event, field) {
		const { hours, minutes } = this.getFieldsValue();
		const value = event.target.value;
		if (field === HOURS) {
			this.props.onChange(event, value * 60 + minutes);
		} else if (field === MINUTES) {
			this.props.onChange(event, hours * 60 + value);
		}
	}

	getFieldsValue() {
		return {
			hours: this.props.value ? Math.floor(this.props.value / 60) : 0,
			minutes: this.props.value ? this.props.value % 60 : 0,
		};
	}

	render() {
		const tabIndex = this.props.allowFocus ? 0 : -1;
		const { hours, minutes } = this.getFieldsValue();

		return (
			<div className={classNames('tc-date-picker-time', theme['time-picker'])}>
				<legend>Time</legend>
				<label htmlFor={this.hourId} className="sr-only">
					Hours
				</label>
				<DebounceInput
					id={this.hourId}
					type="number"
					min="0"
					max="23"
					value={hours}
					tabIndex={tabIndex}
					onChange={event => this.onChange(event, HOURS)}
				/>
				<hr />
				<label htmlFor={this.minuteId} className="sr-only">
					Minutes
				</label>
				<DebounceInput
					id={this.minuteId}
					type="number"
					min="0"
					max="59"
					value={minutes}
					tabIndex={tabIndex}
					onChange={event => this.onChange(event, MINUTES)}
				/>
			</div>
		);
	}
}

TimePicker.defaultProps = {
	interval: 15,
};

TimePicker.propTypes = {
	allowFocus: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.number,
};

export default TimePicker;
