import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../MonthPicker';
import YearPicker from '../YearPicker';
import theme from './MonthYearWrapper.scss';

function MonthYearWrapper(props) {

	return (
		<div className={theme.container}>
			<div className={theme.months}>
				<MonthPicker />
			</div>
			<div className={theme.years}>
				<YearPicker />
			</div>
		</div>
	);
}

MonthYearWrapper.propTypes = {
};

export default MonthYearWrapper;
