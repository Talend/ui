import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../../pickers/MonthPicker';
import YearPicker from '../../pickers/YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import IconButton from '../../IconButton';
import HeaderTitle from '../HeaderTitle';

function MonthYearView(props) {
	const header = {
		leftElement: <IconButton
			icon={{
				name: 'talend-arrow-left',
				className: theme['action-left-icon'],
			}}
			className={theme['action-left']}
			aria-label="Switch back to date and time pickers view"
			onClick={props.onBackClick}
		/>,
		middleElement: <HeaderTitle
			monthIndex={props.monthIndexSelected}
			year={props.yearSelected}
		/>,
	};

	const bodyElement = (
		<div className={theme.body}>
			<div className={theme.month}>
				<MonthPicker
					monthIndexSelected={props.monthIndexSelected}
					onMonthSelected={props.onMonthSelected}
				/>
			</div>
			<div className={theme.year}>
				<YearPicker
					yearSelected={props.yearSelected}
					onYearSelected={props.onYearSelected}
				/>
			</div>
		</div>
	);

	return (
		<ViewLayout
			header={header}
			bodyElement={bodyElement}
		/>
	);
}

MonthYearView.propTypes = {
	monthIndexSelected: PropTypes.number.isRequired,
	yearSelected: PropTypes.number.isRequired,
	onBackClick: PropTypes.func,
	onMonthSelected: PropTypes.func,
	onYearSelected: PropTypes.func,
};

export default MonthYearView;
