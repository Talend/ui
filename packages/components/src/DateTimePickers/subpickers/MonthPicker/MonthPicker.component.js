import React from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import theme from './MonthPicker.scss';
import PickerAction from '../../shared/PickerAction';

function MonthPicker(props) {
	const months = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre',
	];

	const monthsRows = chunk(months, 3);
	const selectedMonth = 'Septembre';

	function isSelected(m) {
		return selectedMonth === m;
	}

	return (
		<div className={theme.container}>
			{monthsRows.map((monthsRow, i) =>
				<div className={theme.row} key={i}>
					{monthsRow.map((month, j) =>
						<div
							key={j}
							className={theme.month}
						>
							<PickerAction
								aria-label={`Select '${month}'`}
								isSelected={isSelected(month)}
								label={month}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

MonthPicker.propTypes = {
};

export default MonthPicker;
