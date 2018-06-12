import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../MonthPicker';
import YearPicker from '../YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import Action from '../../Actions/Action';

function MonthYearView(props) {

	const header = {
		leftNode: <Action
			icon="talend-arrow-left"
			link
			className={theme['action-left']}
		/>,
		middleNode: <span className={theme['action-middle']}>Septembre 2017</span>,
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
