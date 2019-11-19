import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../../Actions';
import MonthPicker from '../../pickers/MonthPicker';
import ViewLayout from '../ViewLayout';
import HeaderTitle from '../HeaderTitle';
import getDefaultT from '../../../translate';

function MonthYearView(props) {
	const header = {
		leftElement: (
			<Action
				label=""
				aria-label={props.t('DATEPICKER_TO_DATE_VIEW', {
					defaultValue: 'Switch back to date and time pickers view',
				})}
				icon="talend-arrow-left"
				onClick={props.onBackClick}
				tabIndex={props.allowFocus ? 0 : -1}
				className="btn-tertiary btn-info"
			/>
		),
		middleElement: (
			<HeaderTitle
				monthIndex={props.selectedMonthIndex}
				year={props.selectedYear}
				onSelectYear={props.onSelectYear}
			/>
		),
	};

	const bodyElement = (
		<MonthPicker
			allowFocus={props.allowFocus}
			selectedMonthIndex={props.selectedMonthIndex}
			selectedYear={props.selectedYear}
			onSelect={props.onSelectMonth}
		/>
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
	t: PropTypes.func.isRequired,
};

MonthYearView.defaultProps = {
	t: getDefaultT(),
};

export default MonthYearView;
