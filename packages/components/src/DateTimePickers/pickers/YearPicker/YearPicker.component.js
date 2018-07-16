import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollActionList from '../IncrementableScrollActionList';

const yearRange = 300;

class YearPicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		const middleYear = now.getFullYear();

		const firstYear = middleYear - Math.ceil(yearRange / 2);

		this.items = (new Array(yearRange))
			.fill(0)
			.map((_, i) => firstYear + i)
			.map(year => ({
				id: year,
				label: year.toString(),
			}));

		this.initialMiddleVisibleItemId = props.selectedYear === undefined
			? middleYear
			: props.selectedYear;
	}

	render() {
		return (
			<IncrementableScrollActionList
				items={this.items}
				initialMiddleVisibleItemId={this.initialMiddleVisibleItemId}
				selectedItemId={this.props.selectedYear}
				onSelect={item => this.props.onSelect(item.id)}
			/>
		);
	}
}

YearPicker.propTypes = {
	selectedYear: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default YearPicker;
