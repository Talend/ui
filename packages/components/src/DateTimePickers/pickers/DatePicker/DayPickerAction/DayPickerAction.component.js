import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './DayPickerAction.scss';

function DayPickerAction(props) {
	const {
		label,
		isSelectedDay,
		isDisabledDay,
		isCurrentDay,
		className: propClassName,
		...rest
	} = props;

	const className = classNames(
		theme.action,
		{
			[theme.selected]: isSelectedDay,
			[theme.today]: isCurrentDay,
		},
		propClassName,
	);

	return (
		<button
			type="button"
			disabled={isDisabledDay}
			className={className}
			{...rest}
		>
			{label}
		</button>
	);
}

DayPickerAction.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	isSelectedDay: PropTypes.bool,
	isDisabledDay: PropTypes.bool,
	isCurrentDay: PropTypes.bool,
};

export default DayPickerAction;
