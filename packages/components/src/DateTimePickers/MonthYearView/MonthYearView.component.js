import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../MonthPicker';
import YearPicker from '../YearPicker';
import theme from './MonthYearView.scss';

function MonthYearView(props) {

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

MonthYearView.propTypes = {
};

export default MonthYearView;
