import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function getAction(action, index) {
	function onClick(event) {
		if (action.onClick) {
			action.onClick(event, { value: event.target.value });
		}
	}

	return (
		<Action
			key={`${index}-enum-header-action`}
			label={action.label}
			icon={action.icon}
			onClick={onClick}
			btooltipPlacement="bottom"
			hideLabel
			link
		/>
	);
}

function Header({ headerDefault }) {
	return (
		<header className={headerClasses()}>
			<span>Values</span>
			{headerDefault.map((action, index) => getAction(action, index))}
		</header>
	);
}

Header.propTypes = {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
};

export default Header;
