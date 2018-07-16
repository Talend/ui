import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollList from '../IncrementableScrollActionList/IncrementableScrollList';
import PickerAction from '../../PickerAction';

const yearRange = 300;

class YearPicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		const middleYear = now.getFullYear();

		const firstYear = middleYear - Math.ceil(yearRange / 2);

		this.years = (new Array(yearRange))
			.fill(0)
			.map((_, i) => firstYear + i)
			.map(year => ({
				id: year,
				label: year.toString(),
			}));

		const initialYear = props.selectedYear === undefined
			? middleYear
			: props.selectedYear;

		this.initialIndex = this.years.findIndex(info => info.id === initialYear) - 2;

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
