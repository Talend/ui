import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollList from '../IncrementableScrollList';
import PickerAction from '../../PickerAction';
import twoDigits from '../../utils/twoDigits';

// All times in this component represents a number of minutes since the beginning of the day

const maxTime = 24 * 60;

class TimePicker extends React.Component {

	constructor(props) {
		super(props);

		const nbTimeSelectable = Math.ceil(maxTime / props.interval);

		this.times = (new Array(nbTimeSelectable))
			.fill(0)
			.map((_, i) => i * props.interval)
			.map(time => {
				const hours = Math.floor(time / 60);
				const minutes = time % 60;

				return {
					time,
					label: `${twoDigits(hours)}:${twoDigits(minutes)}`,
				};
			});

		const initialTime = (() => {
			if (props.selectedTime !== undefined) {
				return props.selectedTime;
			}

			const now = new Date();
			return now.getHours() * 60 + now.getMinutes();
		})();

		const closestSelectableTime = this.times
			.map(({ time }, index) => ({
				index,
				diff: Math.abs(time - initialTime),
			}))
			.sort((a, b) => a.diff - b.diff)[0] || 0;

		this.initialIndex = closestSelectableTime.index - 2;

		this.isSelected = this.isSelected.bind(this);
	}

	isSelected(time) {
		return time === this.props.selectedTime;
	}

	render() {
		const itemRenderer = item => {
			const { time, label } = item;
			return (
				<PickerAction
					aria-label={`Select '${label}'`}
					isSelected={this.isSelected(time)}
					label={label}
					onClick={() => this.props.onSelect(time)}
				/>
			);
		};

		return (
			<IncrementableScrollList
				items={this.times}
				initialIndex={this.initialIndex}
				itemRenderer={itemRenderer}
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
