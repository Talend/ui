import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setYear from 'date-fns/set_year';
import setMonth from 'date-fns/set_month';
import format from 'date-fns/format';
import theme from './HeaderTitle.scss';

function HeaderTitle(props) {
	const isButton = !!props.button;

	const className = classNames(theme.common, { [theme.button]: isButton }, props.className);

	const propsToSpread = {
		className,
		...(isButton ? props.button : {}),
	};

	const date = setYear(setMonth(new Date(0), props.monthIndex), props.year);
	const label = format(date, 'MMMM YYYY');

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
};

export default HeaderTitle;
