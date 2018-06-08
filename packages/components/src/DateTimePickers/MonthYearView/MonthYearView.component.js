import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../MonthPicker';
import YearPicker from '../YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import Action from '../../Actions/Action';

function MonthYearView(props) {

	const header = {
		leftItem: <Action
			icon="talend-arrow-left"
			hideLabel
			link
		/>,
		middleItem: <span className={theme.title}>Septembre 2017</span>,
		rightItem: null,
	};

	const viewComponent = (
		<div className={theme.body}>
			<div className={theme.months}>
				<MonthPicker />
			</div>
			<div className={theme.years}>
				<YearPicker />
			</div>
		</div>
	);

	return (
		<ViewLayout
			header={header}
			viewComponent={viewComponent}
		/>
	);
}

MonthYearView.propTypes = {
};

export default MonthYearView;
