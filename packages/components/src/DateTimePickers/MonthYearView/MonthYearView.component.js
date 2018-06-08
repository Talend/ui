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

	const bodyNode = (
		<div className={theme.body}>
			<div className={theme.month}>
				<MonthPicker />
			</div>
			<div className={theme.year}>
				<YearPicker />
			</div>
		</div>
	);

	return (
		<ViewLayout
			header={header}
			bodyNode={bodyNode}
		/>
	);
}

MonthYearView.propTypes = {
};

export default MonthYearView;
