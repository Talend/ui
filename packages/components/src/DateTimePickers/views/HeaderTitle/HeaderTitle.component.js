import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setYear from 'date-fns/set_year';
import setMonth from 'date-fns/set_month';
import format from 'date-fns/format';
import { translate } from 'react-i18next';
import theme from './HeaderTitle.scss';
import { getPickerLocale } from '../../generator';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

function HeaderTitle(props) {
	const isButton = !!props.button;

	const className = classNames(theme.common, { [theme.button]: isButton }, props.className);

	const propsToSpread = {
		className,
		...(isButton ? props.button : {}),
	};

	const pickerLocale = getPickerLocale(props.t);
	const date = setYear(setMonth(new Date(0), props.monthIndex), props.year);
	const label = format(date, 'MMMM YYYY', pickerLocale);

	if (isButton) {
		return (
			<button type="button" {...propsToSpread}>
				{label}
			</button>
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
};

HeaderTitle.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(HeaderTitle);
