import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Action, Actions, ActionDropdown, ActionSplitDropdown } from '../Actions';
import CircularProgress from '../CircularProgress';
import Inject from '../Inject';
import I18N_DOMAIN_COMPONENTS from '../constants';
import css from './ActionBar.scss';

const DISPLAY_MODES = {
	DROPDOWN: 'dropdown',
	SPLIT_DROPDOWN: 'splitDropdown',
	BTN_GROUP: 'btnGroup',
	DIVIDER: 'divider',
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

function getActionsToRender({ selected, actions, multiSelectActions = {}, appMultiSelectActions }) {
	if (selected > 0) {
		if (appMultiSelectActions) {
			return ['left', 'center', 'right'].reduce((result, type) => {
				if (multiSelectActions[type] && appMultiSelectActions[type]) {
					return {
						...result,
						[type]: [
							...multiSelectActions[type],
							{ displayMode: 'divider' },
							...appMultiSelectActions[type],
						],
					};
				}
				return { ...result, [type]: multiSelectActions[type] || appMultiSelectActions[type] };
			}, {});
		}
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
	const props = {
		className: getContentClassName(tag, left, center, right, className),
		...rest,
	};
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
	function getActionsElements(action, index) {
		const { displayMode, ...rest } = action;
		switch (displayMode) {
			case DISPLAY_MODES.DIVIDER:
				return (
					<span className="divider" key={index}>
						|
					</span>
				);
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
	}
	return actions.map(getActionsElements);
}

function SwitchActions({ actions, left, right, center, getComponent, components }) {
	if (!actions.length && !components) {
		return null;
	}

	const injected = Inject.all(getComponent, components);

	return (
		<Content left={left} right={right} center={center}>
			{injected('before-actions')}
			{getActionsFromRenderers(actions, getComponent)}
			{injected('after-actions')}
		</Content>
	);
}
SwitchActions.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.shape(actionsShape)),
	left: PropTypes.bool,
	right: PropTypes.bool,
	center: PropTypes.bool,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};
SwitchActions.defaultProps = {
	actions: [],
};

function Count({ selected }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	if (!selected) {
		return null;
	}
	return (
		<span className={classNames(css['tc-actionbar-selected-count'], 'tc-actionbar-selected-count')}>
			{t('ACTION_BAR_COUNT_SELECTED', { defaultValue: '{{selected}} selected', selected })}
		</span>
	);
}
Count.propTypes = {
	selected: PropTypes.number,
};

function defineComponentLeft(parentComponentLeft, selected, hideCount) {
	if (parentComponentLeft) {
		return parentComponentLeft;
	}

	if (!hideCount && selected > 0) {
			return {
				'before-actions': <Count selected={selected} />,
			};
	}

	return undefined;
}

export function ActionBar(props) {
	const { left, right, center } = getActionsToRender(props);
	const cssClass = classNames(
		css['tc-actionbar-container'],
		'tc-actionbar-container',
		'nav',
		props.className,
	);

	const componentsLeft = defineComponentLeft(
		props.components.left,
		props.selected,
		props.hideCount,
	);
	const componentsCenter = props.components.center;
	const componentsRight = props.components.right;

	return (
		<div className={cssClass}>
			<SwitchActions
				getComponent={props.getComponent}
				key={0}
				actions={left}
				left
				components={componentsLeft}
			/>
			{props.children}
			<SwitchActions
				getComponent={props.getComponent}
				key={1}
				actions={center}
				center
				components={componentsCenter}
			/>
			<SwitchActions
				getComponent={props.getComponent}
				key={2}
				actions={right}
				right
				components={componentsRight}
			/>
		</div>
	);
}

ActionBar.propTypes = {
	selected: PropTypes.number,
	hideCount: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};
ActionBar.defaultProps = {
	components: {},
};
ActionBar.displayName = 'ActionBar';

ActionBar.DISPLAY_MODES = DISPLAY_MODES;
ActionBar.Count = Count;
ActionBar.SwitchActions = SwitchActions;
ActionBar.getActionsToRender = getActionsToRender;
ActionBar.Content = Content;
ActionBar.getContentClassName = getContentClassName;
export default ActionBar;
