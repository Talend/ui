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
			onClick={props.onClickBack}
		/>,
		middleElement: <HeaderTitle
			monthIndex={props.selectedMonthIndex}
			year={props.selectedYear}
		/>,
	};

	const bodyElement = (
		<div className={theme.body}>
			<div className={theme.month}>
				<MonthPicker
					selectedMonthIndex={props.selectedMonthIndex}
					onSelect={props.onSelectMonth}
				/>
			</div>
			<div className={theme.year}>
				<YearPicker
					selectedYear={props.selectedYear}
					onSelect={props.onSelectYear}
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
	selectedMonthIndex: PropTypes.number.isRequired,
	selectedYear: PropTypes.number.isRequired,
	onClickBack: PropTypes.func,
	onSelectMonth: PropTypes.func,
	onSelectYear: PropTypes.func,
};

export default MonthYearView;
