import React from 'react';
import PropTypes from 'prop-types';
import theme from './MonthPicker.scss';

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

	return (
		<div className={theme.container}>
			{months.map((month, i) =>
				<div className={theme.month} key={i}>
					{month}
				</div>
			)}
		</div>
	);
}

MonthPicker.propTypes = {
};

export default MonthPicker;
