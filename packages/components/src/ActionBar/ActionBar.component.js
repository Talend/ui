import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Action, Actions, ActionDropdown, ActionSplitDropdown } from '../Actions';
import css from './ActionBar.scss';

const DISPLAY_MODES = {
	DROPDOWN: 'dropdown',
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

function getRenderers(props) {
	return Object.assign(
		{
			Action,
			Actions,
			ActionDropdown,
			ActionSplitDropdown,
		},
		props ? props.renderers : {},
	);
}

function getActionsToRender({ selected, actions, multiSelectActions }) {
	if (selected > 0) {
		return multiSelectActions || {};
	}
	return actions || {};
}

function getContentClassName({ tag, className, left, right }) {
	return classNames(
		className,
		{
			[`${css['navbar-left']}`]: left,
			[`${css['navbar-right']}`]: right,
			'navbar-left': left,
			'navbar-right': right,
			'navbar-text': tag === 'p',
			'navbar-btn': tag === 'button',
			'navbar-form': tag === 'form',
			'navbar-link': tag === 'a',
		},
	);
}

function Content({ tag = 'div', left, right, className, children, ...rest }) {
	const props = Object.assign({
		className: getContentClassName({ tag, left, right, className }),
	}, rest);
	return React.createElement(tag, props, children);
}
Content.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	left: PropTypes.bool,
	right: PropTypes.bool,
	tag: PropTypes.oneOf(['p', 'button', 'form', 'a', 'div']),
};

function SwitchActions({ actions, left, right, selected, renderers }) {
	const Renderers = getRenderers({ renderers });
	return (
		<Content left={left} right={right}>
			{ selected > 0 && !right ? (
				<Count selected={selected} />
			) : null }
			{ actions.map((action, index) => {
				const { displayMode, ...rest } = action;
				switch (displayMode) {
					case DISPLAY_MODES.DROPDOWN:
						return <Renderers.ActionDropdown key={index} {...rest} />;
					case DISPLAY_MODES.SPLIT_DROPDOWN:
						return <Renderers.ActionSplitDropdown key={index} {...rest} />;
					case DISPLAY_MODES.BTN_GROUP:
						return <Renderers.Actions key={index} {...rest} />;
					default:
						return <Renderers.Action key={index} displayMode={displayMode} {...rest} />;
				}
			}) }
		</Content>
	);
}
SwitchActions.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.shape(actionsShape)).isRequired,
	left: PropTypes.bool,
	right: PropTypes.bool,
	selected: PropTypes.number,
	renderers: PropTypes.shape(
		{
			Action: PropTypes.func,
			Actions: PropTypes.func,
			ActionSplitDropdown: PropTypes.func,
		}
	),
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
	const cssClass = classNames(
		css['tc-actionbar-container'],
		'tc-actionbar-container',
		'nav',
		props.className,
	);
	return (
		<nav className={cssClass}>
			{ (left || !!props.selected) && (
				<SwitchActions
					renderers={props.renderers}
					key={0}
					actions={left}
					selected={props.selected}
					left
				/>
			)}
			{props.children}
			{ right && (
				<SwitchActions
					renderers={props.renderers}
					key={1}
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
	renderers: PropTypes.shape(SwitchActions.propTypes.renderers),
};

ActionBar.displayName = 'ActionBar';
ActionBar.DISPLAY_MODES = DISPLAY_MODES;
ActionBar.Count = Count;
ActionBar.SwitchActions = SwitchActions;
ActionBar.getActionsToRender = getActionsToRender;
ActionBar.Content = Content;
ActionBar.getContentClassName = getContentClassName;
ActionBar.getRenderers = getRenderers;
export default ActionBar;
