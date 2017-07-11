import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { Action, ActionDropdown } from '../../Actions/';
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

	if (action.displayMode === 'dropdown') {
		return (
			<ActionDropdown
				noCaret
				key={`${index}-enum-header-action`}
				label={action.label}
				icon={action.icon}
				onClick={onClick}
				btooltipPlacement="bottom"
				inProgress={action.inProgress}
				items={action.items}
				hideLabel
				pullRight
				link
			/>
		);
	}
	return (
		<Action
			key={`${index}-enum-header-action`}
			label={action.label}
			icon={action.icon}
			onClick={onClick}
			btooltipPlacement="bottom"
			inProgress={action.inProgress}
			hideLabel
			link
		/>
	);
}

function Header({ headerDefault, required, label = 'Values' }) {
	return (
		<header className={headerClasses()}>
			<span>{label}{required && '*'}</span>
			<div className="actions">
				{headerDefault.map(getAction)}
			</div>
		</header>
	);
}

Header.propTypes = {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	required: PropTypes.bool,
	label: PropTypes.string,
};

export default Header;
