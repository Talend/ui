import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';
import theme from './IconButton.scss';

function IconButton(props) {
	const {
		icon: iconProps,
		className: buttonClassNameProp,
		...buttonPropsRest
	} = props;

	const {
		className: iconClassNameProp,
		...iconPropsRest
	} = iconProps;

	const buttonClassName = classNames(buttonClassNameProp, theme.btn);
	const iconClassName = classNames(iconClassNameProp, theme.icon);

	return (
		<button
			type="button"
			className={buttonClassName}
			{...buttonPropsRest}
		>
			<Icon
				key="icon"
				className={iconClassName}
				{...iconPropsRest}
			/>
		</button>
	);
}

IconButton.propTypes = {
	icon: PropTypes.shape({
		...Icon.propTypes,
	}).isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
};

export default IconButton;
