import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollList from '../IncrementableScrollList';
import twoDigits from '../../shared/utils/format/twoDigits';

// All times in this component represents a number of minutes since the beginning of the day

const maxTime = 24 * 60;

function getInitialTime(selectedTime) {
	if (selectedTime === undefined) {
		const now = new Date();
		return now.getHours() * 60 + now.getMinutes();
	}

	return selectedTime;
}

function toItemWithDiff(initialTime) {
	return function adaptWithDiff(item, index) {
		return {
			index,
			item,
			diff: Math.abs(item.id - initialTime),
		};
	};
}

function selectLowestDiff(previous, next) {
	if (previous && previous.diff < next.diff) {
		return previous;
	}
	return next;
}

class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);

		const nbTimeSelectable = Math.ceil(maxTime / props.interval);
		this.items = new Array(nbTimeSelectable)
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
		this.initialIndex = this.items.map(toItemWithDiff(initialTime)).reduce(selectLowestDiff).index;
	}

	onSelect(item) {
		return this.props.onSelect(item.id);
	}

	render() {
		return (
			<IncrementableScrollList
				initialIndex={this.initialIndex}
				items={this.items}
				onSelect={this.onSelect}
				selectedItemId={this.props.selectedTime}
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
