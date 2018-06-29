import React from 'react';
import PropTypes from 'prop-types';
import addYears from 'date-fns/add_years';
import setYear from 'date-fns/set_year';
import IncrementableScrollList from '../IncrementableScrollList';

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
	}

	render() {
		return (
			<IncrementableScrollList
				selectedId={this.props.selectedYear}
				items={this.years}
				onSelect={this.props.onSelect}
				initialIndex={this.initialIndex}
			/>
		);
	}
}

YearPicker.propTypes = {
	selectedYear: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default YearPicker;
