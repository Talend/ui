import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setYear from 'date-fns/set_year';
import setMonth from 'date-fns/set_month';
import format from 'date-fns/format';
import theme from './HeaderTitle.scss';
import { getPickerLocale } from '../../generator';
import getDefaultT from '../../../translate';
import { ActionDropdown } from '../../../Actions';
import YearPicker from '../../pickers/YearPicker';

function HeaderTitle(props) {
	const isButton = !!props.button;

	const className = classNames(isButton ? [theme.button] : [theme.common], props.className);

	const propsToSpread = {
		className,
		...(isButton ? props.button : {}),
	};

	const pickerLocale = getPickerLocale(props.t);
	const date = setYear(setMonth(new Date(0), props.monthIndex), props.year);
	const label = format(date, 'MMMM YYYY', pickerLocale);
	const yearLabel = format(date, 'YYYY', pickerLocale);
	const monthLabel = format(date, 'MMMM', pickerLocale);

	const withComponents = {
		getComponent: key => {
			if (key === 'YearPicker') {
				return YearPicker;
			}
			throw new Error('Component not found');
		},
		components: {
			itemsDropdown: [
				{
				    id: 'year-picker-in-datetime-header',
					component: 'YearPicker',
					label: 'First item',
					'data-feature': 'actiondropdown.items',
					onSelect: props.onSelectYear,
				},
			],
		},
	};

	if (isButton) {
		return (<div className={theme.common}>
			<button type="button" {...propsToSpread}>
				{monthLabel}
			</button>
			<ActionDropdown link label={yearLabel} {...withComponents} />
		</div>
		);
	}

	return <span {...propsToSpread}>{label}</span>;
}

HeaderTitle.propTypes = {
	monthIndex: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	button: PropTypes.object,
	className: PropTypes.string,
	t: PropTypes.func,
	onSelectYear: PropTypes.func.isRequired,
};

HeaderTitle.defaultProps = {
	t: getDefaultT(),
};

export default HeaderTitle;
