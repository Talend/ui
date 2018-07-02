import React from 'react';
import PropTypes from 'prop-types';
import addYears from 'date-fns/add_years';
import setYear from 'date-fns/set_year';
import IncrementableScrollList from '../IncrementableScrollList';
import PickerAction from '../../PickerAction';

const baseDate = new Date(0);
const yearRange = 300;

class YearPicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		const middleYear = now.getFullYear();

		const firstYear = middleYear - Math.ceil(yearRange / 2);
		const firstDate = setYear(baseDate, firstYear);

		this.years = (new Array(yearRange))
			.fill(0)
			.map((_, i) => addYears(firstDate, i))
			.map(date => date.getFullYear())
			.map(year => ({
				id: year,
				label: year.toString(),
			}));

		const indexOfYear = year => year - firstYear;

		const initialYear = props.selectedYear === undefined
			? now.getFullYear()
			: props.selectedYear;

		this.initialIndex = indexOfYear(initialYear) - 2;

		this.isSelected = this.isSelected.bind(this);
	}

	isSelected(year) {
		return year === this.props.selectedYear;
	}

	render() {
		const itemRenderer = item => {
			const { id, label } = item;
			return (
				<PickerAction
					aria-label={`Select '${label}'`}
					isSelected={this.isSelected(id)}
					label={label}
					onClick={() => this.props.onSelect(id)}
				/>
			);
		};

		return (
			<IncrementableScrollList
				items={this.years}
				initialIndex={this.initialIndex}
				itemRenderer={itemRenderer}
			/>
		);
	}
}

YearPicker.propTypes = {
	selectedYear: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default YearPicker;
