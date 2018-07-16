import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollActionList from '../IncrementableScrollActionList';

// All times in this component represents a number of minutes since the beginning of the day

const maxTime = 24 * 60;

export function twoDigits(number) {
	return number.toLocaleString(undefined, {
		minimumIntegerDigits: 2,
	});
}

function getInitialTime(selectedTime) {
	if (selectedTime === undefined) {
		const now = new Date();
		return now.getHours() * 60 + now.getMinutes();
	}

	return selectedTime;
}

class TimePicker extends React.Component {

	constructor(props) {
		super(props);

		const nbTimeSelectable = Math.ceil(maxTime / props.interval);

		this.items = (new Array(nbTimeSelectable))
			.fill(0)
			.map((_, i) => i * props.interval)
			.map(time => {
				const hours = Math.floor(time / 60);
				const minutes = time % 60;

				return {
					id: time,
					label: `${twoDigits(hours)}:${twoDigits(minutes)}`,
				};
			});

		const initialTime = getInitialTime(props.selectedTime);

		const closestSelectableTime = this.items
			.map(item => ({
				item,
				diff: Math.abs(item.id - initialTime),
			}))
			.sort((a, b) => a.diff - b.diff)[0];

		this.initialMiddleVisibleItemId = closestSelectableTime.item.id;
	}

	render() {
		return (
			<IncrementableScrollActionList
				items={this.items}
				initialMiddleVisibleItemId={this.initialMiddleVisibleItemId}
				selectedItemId={this.props.selectedTime}
				onSelect={item => this.props.onSelect(item.id)}
			/>
		);
	}
}

TimePicker.defaultProps = {
	interval: 15,
};

TimePicker.propTypes = {
	selectedTime: PropTypes.number,
	interval: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default TimePicker;
