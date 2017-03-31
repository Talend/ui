import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

function headerClasses() {
	return classNames({
		[theme['tc-enumeration-header']]: true,
		'tc-enumeration-header': true,
	});
}

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

function Header({ headerDefault, required }) {
	return (
		<header className={headerClasses()}>
			<span>Values{required && '*'}</span>
			<div className="actions">
				{headerDefault.map(getAction)}
			</div>
		</header>
	);
}

Header.propTypes = {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	required: PropTypes.bool,
};

export default Header;
