import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';
import DebounceInput from 'react-debounce-input';

import theme from './TimePicker.scss';

const HOURS = 'HOURS';
const MINUTES = 'MINUTES';
const SECONDS = 'SECONDS';

class TimePicker extends React.PureComponent {
	constructor(props) {
		super(props);
		const id = uuid.v4();
		this.hourId = `${id}-hour`;
		this.minuteId = `${id}-minute`;
		this.secondId = `${id}-second`;
		this.onChange = this.onChange.bind(this);
	}

	onChange(event, field) {
		const inputValue = event.target.value;
		const newValue = { ...this.props.value };
		if (field === HOURS) {
			newValue.hours = inputValue;
		} else if (field === MINUTES) {
			newValue.minutes = inputValue;
		} else if (field === SECONDS) {
			newValue.seconds = inputValue;
		}
		this.props.onChange(event, newValue);
	}

	renderSeconds(tabIndex) {
		if (this.props.useSeconds) {
			return [
				<hr key="hr-seconds" />,
				<label key="label-seconds" htmlFor={this.secondId} className="sr-only">
					Seconds
				</label>,
				<DebounceInput
					key="input-seconds"
					id={this.secondId}
					className={theme['time-input']}
					value={this.props.value.seconds}
					tabIndex={tabIndex}
					onChange={event => this.onChange(event, SECONDS)}
				/>,
			];
		}
		return null;
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
				{this.renderSeconds(tabIndex)}
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
		hours: PropTypes.string,
		minutes: PropTypes.string,
		seconds: PropTypes.string,
	}),
	useSeconds: PropTypes.bool,
};

export default TimePicker;
