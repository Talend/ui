import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { Action, ActionDropdown } from '../../Actions';
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
				{...action}
				noCaret
				key={`${index}-enum-header-action`}
				onClick={onClick}
				btooltipPlacement="bottom"
				hideLabel
				pullRight
				link
			/>
		);
	}
	return (
		<Action
			{...action}
			key={`${index}-enum-header-action`}
			onClick={onClick}
			btooltipPlacement="bottom"
			hideLabel
			link
		/>
	);
}

function Header({ headerDefault, required, label }) {
	return (
		<header className={headerClasses()}>
			<span>
				{label}
				{required && '*'}
			</span>
			<div className="actions">
				{headerDefault.filter(action => !action.disabled).map(getAction)}
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
