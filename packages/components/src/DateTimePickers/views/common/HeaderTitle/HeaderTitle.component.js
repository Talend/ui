import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './HeaderTitle.scss';

function HeaderTitle(props) {
	const isButton = !!props.button;

	const className = classNames(
		theme.common,
		isButton ? theme.button : undefined,
		props.className,
	);

	const propsToSpread = {
		className,
		...(isButton ? props.button : {}),
	};

	const children = props.label;

	const elementType = isButton ? 'button' : 'span';

	return React.createElement(elementType, propsToSpread, children);
}

HeaderTitle.propTypes = {
	button: PropTypes.object,
	label: PropTypes.string,
	className: PropTypes.string,
};

export default HeaderTitle;
