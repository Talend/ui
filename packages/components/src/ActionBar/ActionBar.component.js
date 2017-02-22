import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Action, Actions, ActionSplitDropdown } from '../Actions';
import css from './ActionBar.scss';

const DISPLAY_MODES = {
	SPLIT_DROPDOWN: 'splitDropdown',
	BTN_GROUP: 'btnGroup',
};

function ActionBar({ selected, actions, multiSelectActions }) {
	function getActionsToRender() {
		if (selected > 0) {
			return multiSelectActions;
		}
		return actions;
	}

	function renderActions(actionsToRender) {
		return actionsToRender.map((action, index) => {
			const { displayMode, ...rest } = action;
			switch(displayMode) {
			case DISPLAY_MODES.SPLIT_DROPDOWN:
				return (
					<ActionSplitDropdown key={index} {...rest} />
				);
			case DISPLAY_MODES.BTN_GROUP:
				return (
					<Actions key={index} {...rest} />
				);
			default:
				return (
					<Action key={index} {...rest} />
				);
			}
		});
	}

	function renderSelectedCount() {
		return (<span className={classNames(css['tc-actionbar-selected-count'], 'tc-actionbar-selected-count')}>
			{selected} selected
		</span>);
	}

	function renderActionBar() {
		const { left, right } = getActionsToRender();
		const actionBar = [];
		if (left) {
			actionBar.push(
				<div key={0} className={classNames(css['navbar-left'], 'navbar-left')}>
					{ selected > 0 ? renderSelectedCount() : null}
					{ renderActions(left) }
				</div>,
			);
		}
		if (right) {
			actionBar.push(
				<div key={1} className={classNames(css['navbar-right'], 'navbar-right')}>
					{ selected > 0 && !left ? renderSelectedCount() : null}
					{ renderActions(right) }
				</div>,
			);
		}
		return actionBar;
	}

	return (
		<nav className={classNames(css['tc-actionbar-container'], 'tc-actionbar-container', 'nav')}>
			{ renderActionBar() }
		</nav>
	);
}

const actionsShape = {
	left: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(Action.propTypes),
		PropTypes.shape(ActionSplitDropdown.propTypes),
	])),
	right: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(Action.propTypes),
		PropTypes.shape(ActionSplitDropdown.propTypes),
	])),
};

ActionBar.propTypes = {
	selected: PropTypes.number,
	actions: PropTypes.shape(actionsShape).isRequired,
	multiSelectActions: PropTypes.shape(actionsShape),
};

ActionBar.defaultProps = {
	actions: [],
};

ActionBar.DISPLAY_MODES = DISPLAY_MODES;

export default ActionBar;
