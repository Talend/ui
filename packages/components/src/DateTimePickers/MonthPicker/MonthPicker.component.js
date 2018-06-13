import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { chunk } from 'lodash';
import theme from './MonthPicker.scss';
import { ActionButton } from '../../Actions';

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

	function getClassIfSelected(m) {
		return selectedMonth === m ? theme.selected : undefined;
	}

	return (
		<div className={theme.container}>
			{monthsRows.map((monthsRow, i) =>
				<div className={theme.row} key={i}>
					{monthsRow.map((month, j) =>
						<ActionButton
							key={j}
							label={month}
							link
							className={classNames(
								theme.month,
								getClassIfSelected(month),
							)}
							aria-label={`Select '${month}'`}
						/>
					)}
				</div>
			)}
		</div>
	);
}

MonthPicker.propTypes = {
};

export default MonthPicker;
