import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Action } from '../../../Actions';
import MonthPicker from '../../pickers/MonthPicker';
import YearPicker from '../../pickers/YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import HeaderTitle from '../HeaderTitle';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

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
	t: PropTypes.func.isRequired,
};

MonthYearView.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(MonthYearView);
