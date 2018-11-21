import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollList from '../../shared/components/IncrementableScrollList';

const yearRange = 300;

class YearPicker extends React.Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);

		const now = new Date();
		const middleYear = now.getFullYear();

		const firstYear = middleYear - Math.ceil(yearRange / 2);

		this.items = new Array(yearRange)
			.fill(0)
			.map((_, i) => firstYear + i)
			.map(year => ({
				id: year,
				label: year.toString(),
			}));

		const definedMiddleYear = props.selectedYear === undefined ? middleYear : props.selectedYear;
		this.initialIndex = this.items.findIndex(year => year.id === definedMiddleYear);
	}

	onSelect(event, item) {
		return this.props.onSelect(event, item.id);
	}

	render() {
		return (
			<IncrementableScrollList
				initialIndex={this.initialIndex}
				items={this.items}
				onSelect={this.onSelect}
				selectedItemId={this.props.selectedYear}
			/>
		);
	}
}

YearPicker.propTypes = {
	selectedYear: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default YearPicker;
