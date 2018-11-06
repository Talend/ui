import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';

import theme from './TimePicker.scss';

class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		const id = uuid.v4();
		this.hourId = `${id}-hour`;
		this.minuteId = `${id}-minute`;
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, item) {
		return this.props.onSelect(event, item.id);
	}

	render() {
		const tabIndex = this.props.allowFocus ? 0 : -1;
		const hours = this.props.selectedTime ? Math.floor(this.props.selectedTime / 60) : 0;
		const minutes = this.props.selectedTime ? this.props.selectedTime % 60 : 0;

		return (
			<div className={classNames('tc-date-picker-time', theme['time-picker'])}>
				<legend>Time</legend>
				<label htmlFor={this.hourId} className="sr-only">
					Hours
				</label>
				<input id={this.hourId} type="number" min="0" max="23" value={hours} tabIndex={tabIndex} />
				<hr />
				<label htmlFor={this.minuteId} className="sr-only">
					Minutes
				</label>
				<input
					id={this.minuteId}
					type="number"
					min="0"
					max="59"
					value={minutes}
					tabIndex={tabIndex}
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
	selectedTime: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default TimePicker;
