import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './PickerAction.scss';

function PickerAction(props) {
	const className = classNames(
		theme.action,
		props.isSelected ? theme.selected : undefined,
		props.className,
	);

	return (
		<button
			className={className}
		>
			<span
				className={theme.text}
			>
				{props.label}
			</span>
		</button>
	);
}

PickerAction.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	isSelected: PropTypes.bool,
};

export default PickerAction;
