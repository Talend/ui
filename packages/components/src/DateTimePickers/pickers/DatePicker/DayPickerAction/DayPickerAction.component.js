import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './DayPickerAction.scss';

function DayPickerAction(props) {
	const {
		label,
		isSelected,
		isDisabled,
		isToday,
		className: propClassName,
		...rest
	} = props;

	const className = classNames(
		theme.action,
		{
			[theme.selected]: isSelected,
			[theme.today]: isToday,
		},
		propClassName,
	);

	return (
		<button
			type="button"
			disabled={isDisabled}
			className={className}
			{...rest}
		>
			<span
				className={theme.label}
			>
				{label}
			</span>
		</button>
	);
}

DayPickerAction.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	isSelected: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isToday: PropTypes.bool,
};

export default DayPickerAction;
