import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Action, Actions, ActionSplitDropdown } from '../Actions';
import css from './ActionBar.scss';

const DISPLAY_MODES = {
	SPLIT_DROPDOWN: 'splitDropdown',
	BTN_GROUP: 'btnGroup',
};

const actionsShape = {
	left: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(Action.propTypes),
		PropTypes.shape(ActionSplitDropdown.propTypes),
	])),
	right: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(Action.propTypes),
		PropTypes.shape(ActionSplitDropdown.propTypes),
	])),
	children: PropTypes.node,
};

function getActionsToRender({ selected, actions, multiSelectActions }) {
	if (selected > 0) {
		return multiSelectActions || {};
	}
	return actions || {};
}

function SwitchActions({ actions, left, right, selected }) {
	let wrapperClassNamed = null;
	if (left) {
		wrapperClassNamed = classNames(css['navbar-left'], 'navbar-left');
	} else if (right) {
		wrapperClassNamed = classNames(css['navbar-right'], 'navbar-right');
	}
	return (
		<div className={wrapperClassNamed}>
			{ selected > 0 && !right ? (
				<Count selected={selected} />
			) : null }
			{ actions.map((action, index) => {
				const { displayMode, ...rest } = action;
				switch (displayMode) {
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
			}) }
		</div>
	);
}
SwitchActions.propTypes = {
	actions: PropTypes.shape(actionsShape).isRequired,
	left: PropTypes.bool,
	right: PropTypes.bool,
	selected: PropTypes.number,
};
SwitchActions.defaultProps = {
	actions: [],
};

function Count({ selected }) {
	if (!selected) {
		return null;
	}
	return (
		<span className={classNames(css['tc-actionbar-selected-count'], 'tc-actionbar-selected-count')}>
			{selected} selected
		</span>
	);
}
Count.propTypes = {
	selected: PropTypes.number,
};

function ActionBar(props) {
	const { left, right } = getActionsToRender(props);
	return (
		<nav className={classNames(css['tc-actionbar-container'], 'tc-actionbar-container', 'nav')}>
			{ (left || !!props.selected) && (
				<SwitchActions key={0} actions={left} selected={props.selected} left />
			)}
			{props.children}
			{ right && (
				<SwitchActions key={1} actions={right} selected={props.selected} right />
			)}
		</nav>
	);
}

ActionBar.propTypes = {
	selected: PropTypes.number,
	children: PropTypes.node,
};

ActionBar.DISPLAY_MODES = DISPLAY_MODES;
ActionBar.Count = Count;
ActionBar.SwitchActions = SwitchActions;
ActionBar.getActionsToRender = getActionsToRender;

export default ActionBar;
