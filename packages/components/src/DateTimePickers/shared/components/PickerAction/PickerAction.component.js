import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './PickerAction.scss';

function PickerAction(props) {
	const { label, isSelected, className: classNameProp, ...rest } = props;

	const className = classNames(
		theme.action,
		{
			[theme.selected]: isSelected,
		},
		classNameProp,
	);

	return (
		<button type="button" className={className} {...rest}>
			<span className={theme.text}>{label}</span>
		</button>
	);
}

PickerAction.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	isSelected: PropTypes.bool,
};

export default PickerAction;
