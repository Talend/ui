import React from 'react';
import PropTypes from 'prop-types';
import addYears from 'date-fns/add_years';
import setYear from 'date-fns/set_year';
import theme from './YearPicker.scss';
import IconButton from '../../IconButton';
import PickerAction from '../../PickerAction';

const baseDate = new Date(0);

function YearPicker(props) {
	const now = new Date();
	const middleYear = props.currentYear !== undefined
		? props.currentYear
		: now.getFullYear();

	const middleDate = setYear(baseDate, middleYear);
	const firstDate = addYears(middleDate, -2);

	const years = (new Array(5))
		.fill(0)
		.map((_, i) => addYears(firstDate, i))
		.map(date => date.getFullYear());

	function isSelected(year) {
		return year === props.currentYear;
	}

	function onYearSelected(year) {
		return props.onYearSelected && (() => {
			props.onYearSelected(year);
		});
	}

	return (
		<div className={theme.container}>
			<IconButton
				icon={{
					name: 'talend-chevron-left',
					transform: 'rotate-90',
				}}
				className={theme['action-up']}
				aria-label="Scroll to previous years"
			/>
			<div className={theme.years}>
				{years.map(year =>
					<div
						key={year}
						className={theme.year}
					>
						<PickerAction
							aria-label={`Select '${year}'`}
							isSelected={isSelected(year)}
							label={year.toString()}
							onClick={onYearSelected(year)}
						/>
					</div>
				)}
			</div>
			<IconButton
				icon={{
					name: 'talend-chevron-left',
					transform: 'rotate-270',
				}}
				className={theme['action-down']}
				aria-label="Scroll to next years"
			/>
		</div>
	);
}

YearPicker.propTypes = {
	currentYear: PropTypes.number,
	onYearSelected: PropTypes.func,
};

export default YearPicker;
