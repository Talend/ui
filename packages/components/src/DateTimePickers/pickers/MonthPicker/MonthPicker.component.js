import React from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import theme from './MonthPicker.scss';
import PickerAction from '../../PickerAction';

function MonthPicker(props) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	].map((month, i) => ({
		name: month,
		index: i,
	}));

	const monthsRows = chunk(months, 3);

	function isSelected(index) {
		return index === props.currentMonth;
	}

	function onMonthSelected(index) {
		return () => {
			props.onMonthSelected(index);
		};
	}

	return (
		<div className={theme.container}>
			{monthsRows.map((monthsRow, i) =>
				<div className={theme.row} key={i}>
					{monthsRow.map(month =>
						<div
							key={month.index}
							className={theme.month}
						>
							<PickerAction
								aria-label={`Select '${month.name}'`}
								isSelected={isSelected(month.index)}
								label={month.name}
								onClick={onMonthSelected(month.index)}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

MonthPicker.propTypes = {
	currentMonth: PropTypes.number,
	onMonthSelected: PropTypes.func,
};

export default MonthPicker;
