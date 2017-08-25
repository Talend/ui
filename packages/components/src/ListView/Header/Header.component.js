import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

import headerPropTypes from './Header.propTypes';
import headerDefaultProps from './Header.defaultProps';

export function headerClasses() {
	return classNames(theme['tc-listview-header'], 'tc-listview-header');
}

function getAction(action, index) {
	function onClick(event) {
		if (action.onClick) {
			action.onClick(event, { value: event.target.value });
		}
	}

	return (
		<Action
			key={`${index}-listview-header-action`}
			label={action.label}
			icon={action.icon}
			onClick={onClick}
			disabled={action.disabled}
			btooltipPlacement="bottom"
			inProgress={action.inProgress}
			hideLabel
			link
		/>
	);
}

export function renderActions(headerDefault = []) {
	if (headerDefault.length) {
		return (
			<div className="actions">
				{headerDefault.map(getAction)}
			</div>
		);
	}
	return null;
}

function Header({ headerDefault, headerLabel, nbItemsSelected, nbItems, required }) {
	function renderTitle() {
		if (headerLabel) {
			return <strong>{headerLabel}{required && '*'}</strong>;
		}
		return null;
	}

	function renderCount() {
		if (nbItems >= 1 && nbItemsSelected >= 1) {
			return <small>{`(${nbItemsSelected}/${nbItems} selected)`}</small>;
		}
		return null;
	}

	return (
		<header className={headerClasses()}>
			{renderTitle()}
			{renderCount()}
			{renderActions(headerDefault)}
		</header>
	);
}

Header.propTypes = headerPropTypes;

Header.defaultProps = headerDefaultProps;

export default Header;
