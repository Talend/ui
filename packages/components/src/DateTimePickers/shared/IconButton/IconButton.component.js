import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../Icon';
import theme from './IconButton.scss';

function IconButton(props) {
	const {
		icon,
		...buttonProps
	} = props;

	buttonProps.className = classNames(buttonProps.className, theme.btn);
	icon.className = classNames(icon.className, theme.icon);

	return (
		<button
			type="button"
			{...buttonProps}
		>
			<Icon key="icon" {...icon} />
		</button>
	);
}

IconButton.propTypes = {
	onClick: PropTypes.func,
	icon: PropTypes.shape({
		...Icon.propTypes,
	}).isRequired,
};

export default IconButton;
