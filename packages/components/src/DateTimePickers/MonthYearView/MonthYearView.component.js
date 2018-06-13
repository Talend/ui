import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../MonthPicker';
import YearPicker from '../YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import IconButton from '../IconButton';

function MonthYearView(props) {

	const header = {
		leftNode: <IconButton
			icon={{
				name: 'talend-arrow-left',
				className: theme['action-left-icon'],
			}}
			className={theme['action-left']}
			aria-label="Switch back to date and time pickers view"
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
