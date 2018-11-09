import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../../Actions';
import MonthPicker from '../../pickers/MonthPicker';
import YearPicker from '../../pickers/YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import HeaderTitle from '../HeaderTitle';

function MonthYearView(props) {
	const header = {
		leftElement: (
			<Action
				aria-label="Switch back to date and time pickers view"
				icon="talend-arrow-left"
				onClick={props.onBackClick}
				link
			/>
		),
		middleElement: <HeaderTitle monthIndex={props.selectedMonthIndex} year={props.selectedYear} />,
	};

	const bodyElement = (
		<div className={theme.body}>
			<div className={theme.month}>
				<MonthPicker
					allowFocus={props.allowFocus}
					selectedMonthIndex={props.selectedMonthIndex}
					onSelect={props.onSelectMonth}
				/>
			</div>
			<div className={theme.year}>
				<YearPicker
					allowFocus={props.allowFocus}
					selectedYear={props.selectedYear}
					onSelect={props.onSelectYear}
				/>
			</div>
		</div>
	);

	return <ViewLayout header={header} bodyElement={bodyElement} />;
}

MonthYearView.propTypes = {
	allowFocus: PropTypes.bool,
	selectedMonthIndex: PropTypes.number.isRequired,
	selectedYear: PropTypes.number.isRequired,
	onBackClick: PropTypes.func.isRequired,
	onSelectMonth: PropTypes.func.isRequired,
	onSelectYear: PropTypes.func.isRequired,
};

export default MonthYearView;
