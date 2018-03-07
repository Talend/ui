import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Action, Actions, ActionDropdown, ActionSplitDropdown } from '../Actions';
import Inject from '../Inject';
import css from './ActionBar.scss';

const DISPLAY_MODES = {
	DROPDOWN: 'dropdown',
	SPLIT_DROPDOWN: 'splitDropdown',
	BTN_GROUP: 'btnGroup',
};
const TAG_TYPES = {
	DIV: 'div',
	P: 'p',
	FORM: 'form',
	BUTTON: 'button',
	A: 'a',
};

const actionsShape = {
	left: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape(Action.propTypes),
			PropTypes.shape(ActionSplitDropdown.propTypes),
		]),
	),
	right: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape(Action.propTypes),
			PropTypes.shape(ActionSplitDropdown.propTypes),
		]),
	),
	children: PropTypes.node,
};

function getActionsToRender({ selected, actions, multiSelectActions }) {
	if (selected > 0) {
		return multiSelectActions || {};
	}
	return actions || {};
}

function getContentClassName(tag, left, center, right, className) {
	return classNames(className, {
		[`${css['navbar-left']}`]: left,
		[`${css['navbar-right']}`]: right,
		[`${css['navbar-center']}`]: center,
		'navbar-left': left,
		'navbar-right': right,
		'navbar-text': tag === TAG_TYPES.P,
		'navbar-btn': tag === TAG_TYPES.BUTTON,
		'navbar-form': tag === TAG_TYPES.FORM,
		'navbar-link': tag === TAG_TYPES.A,
	});
}

function Content({ tag = TAG_TYPES.DIV, left, right, center, className, children, ...rest }) {
	const props = Object.assign(
		{
			className: getContentClassName(tag, left, center, right, className),
		},
		rest,
	);
	return React.createElement(tag, props, children);
}
Content.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	left: PropTypes.bool,
	right: PropTypes.bool,
	center: PropTypes.bool,
	tag: PropTypes.oneOf([TAG_TYPES.P, TAG_TYPES.BUTTON, TAG_TYPES.FORM, TAG_TYPES.A, TAG_TYPES.DIV]),
};

function getActionsFromRenderers(actions, getComponent) {
	const Renderers = Inject.getAll(getComponent, {
		Action,
		Actions,
		ActionDropdown,
		ActionSplitDropdown,
	});
	return actions.map((action, index) => {
		const { displayMode, ...rest } = action;
		switch (displayMode) {
			case DISPLAY_MODES.DROPDOWN:
				return <Renderers.ActionDropdown key={index} {...rest} />;
			case DISPLAY_MODES.SPLIT_DROPDOWN:
				return <Renderers.ActionSplitDropdown key={index} {...rest} />;
			case DISPLAY_MODES.BTN_GROUP:
				return <Renderers.Actions key={index} {...rest} />;
			default:
				if (displayMode) {
					return <Renderers.Action key={index} displayMode={displayMode} {...rest} />;
				}
				return <Renderers.Action key={index} {...rest} />;
		}
	});
}

function SwitchActions({ actions, left, right, center, selected, getComponent }) {
	return (
		<Content left={left} right={right} center={center}>
			{selected > 0 && left ? <Count selected={selected} /> : null}
			{getActionsFromRenderers(actions, getComponent)}
		</Content>
	);
}
SwitchActions.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.shape(actionsShape)).isRequired,
	left: PropTypes.bool,
	right: PropTypes.bool,
	center: PropTypes.bool,
	selected: PropTypes.number,
	getComponent: PropTypes.func,
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
	const { left, right, center } = getActionsToRender(props);
	const cssClass = classNames(
		css['tc-actionbar-container'],
		'tc-actionbar-container',
		'nav',
		props.className,
	);
	return (
		<nav className={cssClass}>
			{(left || !!props.selected) && (
				<SwitchActions
					getComponent={props.getComponent}
					key={0}
					actions={left}
					selected={props.selected}
					left
				/>
			)}
			{props.children}
			{center && (
				<SwitchActions
					getComponent={props.getComponent}
					key={1}
					actions={center}
					selected={props.selected}
					center
				/>
			)}
			{right && (
				<SwitchActions
					getComponent={props.getComponent}
					key={2}
					actions={right}
					selected={props.selected}
					right
				/>
			)}
		</nav>
	);
}

ActionBar.propTypes = {
	selected: PropTypes.number,
	children: PropTypes.node,
	className: PropTypes.string,
	getComponent: PropTypes.func,
};

ActionBar.displayName = 'ActionBar';
ActionBar.DISPLAY_MODES = DISPLAY_MODES;
ActionBar.Count = Count;
ActionBar.SwitchActions = SwitchActions;
ActionBar.getActionsToRender = getActionsToRender;
ActionBar.Content = Content;
ActionBar.getContentClassName = getContentClassName;
export default ActionBar;
