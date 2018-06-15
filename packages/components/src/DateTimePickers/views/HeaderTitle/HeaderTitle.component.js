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

	const element = isButton
		? <button {... propsToSpread}>{props.label}</button>
		: <span {...propsToSpread}>{props.label}</span>;

	return element;
}

HeaderTitle.propTypes = {
	button: PropTypes.object,
	label: PropTypes.string,
	className: PropTypes.string,
};

export default HeaderTitle;
