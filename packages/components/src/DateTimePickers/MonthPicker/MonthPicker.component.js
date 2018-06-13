import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './MonthPicker.scss';
import { ActionButton } from '../../Actions';
import { chunk } from 'lodash';

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
	const activeMonth = 'Septembre';

	function getClassIfActive(m) {
		return activeMonth === m ? theme.active : undefined;
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
								getClassIfActive(month),
							)}
							aria-label={`Select '${month}' as active month`}
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
