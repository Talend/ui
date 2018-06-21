import React from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import addMonths from 'date-fns/add_months';
import format from 'date-fns/format';
import theme from './MonthPicker.scss';
import PickerAction from '../../PickerAction';

const baseDate = new Date(0);
const indexes = (new Array(12))
	.fill(0)
	.map((_, i) => i);

const months = indexes.map(index => ({
	index,
	name: format(addMonths(baseDate, index), 'MMMM'),
}));
const monthsRows = chunk(months, 3);

function MonthPicker(props) {
	const isSelected = index =>
		index === props.monthIndexSelected;

	const onMonthSelected = index => {
		if (props.onMonthSelected === undefined) {
			return undefined;
		}

		return () => {
			props.onMonthSelected(index);
		};
	};

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
	monthIndexSelected: PropTypes.number,
	onMonthSelected: PropTypes.func,
};

export default MonthPicker;
