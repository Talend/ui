import React from 'react';
import PropTypes from 'prop-types';
import theme from './MonthPicker.scss';
import { chunk } from 'lodash';

function MonthPicker(props) {
	const months = [
		'Jan',
		'Fev',
		'Mars',
		'Avr',
		'Mai',
		'Juin',
		'Juil',
		'Aout',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];

	const monthsRows = chunk(months, 3);

	return (
		<div className={theme.container}>
			{monthsRows.map((monthsRow, i) =>
				<div className={theme.row} key={i}>
					{monthsRow.map((month, j) =>
						<div className={theme.month} key={j}>
							{month}
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
