import classNames from 'classnames';
import format from 'date-fns/format';
import setMonth from 'date-fns/setMonth';
import setYear from 'date-fns/setYear';
import PropTypes from 'prop-types';

import { Action, ActionDropdown } from '../../../Actions';
import { getPickerLocale } from '../../generator';
import YearPicker from '../../pickers/YearPicker';

import theme from './HeaderTitle.module.scss';

function HeaderTitle(props) {
	const isButton = !!props.button;
	const className = classNames(
		theme.common,
		{ [theme.button]: isButton },
		{ 'btn-tertiary btn-info': isButton },
		props.className,
	);
	const propsToSpread = {
		className,
		...(isButton ? props.button : {}),
	};

	const pickerLocale = getPickerLocale();
	const date = setYear(setMonth(new Date(0), props.monthIndex), props.year);
	const label = format(date, 'MMMM yyyy', pickerLocale);
	const yearLabel = format(date, 'yyyy', pickerLocale);
	const monthLabel = format(date, 'MMMM', pickerLocale);

	if (isButton) {
		return <Action {...propsToSpread} label={label} />;
	}

	return (
		<div className={theme.common}>
			<div className={theme.month}>
				<span {...propsToSpread}>{monthLabel}</span>
			</div>
			<ActionDropdown className="btn-tertiary btn-info" label={yearLabel}>
				<YearPicker
					id="year-picker-in-datetime-header"
					data-feature="actiondropdown.items"
					onSelect={props.onSelectYear}
				/>
			</ActionDropdown>
		</div>
	);
}

HeaderTitle.propTypes = {
	monthIndex: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	button: PropTypes.object,
	className: PropTypes.string,
	onSelectYear: PropTypes.func,
};

export default HeaderTitle;
