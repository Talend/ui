import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import ActionBar from '../ActionBar';
import Action from '../Actions/Action';

import theme from './Drawer.scss';


function DrawerAnimation({ children }) {
	return (
		<ReactCSSTransitionGroup
			transitionName="tc-drawer"
			transitionAppearTimeout={230}
			transitionEnterTimeout={230}
			transitionLeaveTimeout={230}
		>
			{children}
		</ReactCSSTransitionGroup>
	);
}

DrawerAnimation.propTypes = {
	children: PropTypes.node,
};

function DrawerContainer({ stacked, tight, className, style, children }) {
	const drawerContainerClasses = classnames(
		theme.drawer,
		className,
		'tc-drawer',
		{
			[theme.drawerStacked]: stacked,
			[theme.drawerTight]: tight,
		});
	return (
		<div className={drawerContainerClasses} style={style}>
			<div className={theme.drawerContainer}>
				{children}
			</div>
		</div>
	);
}

DrawerContainer.propTypes = {
	stacked: PropTypes.bool,
	tight: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node.isRequired,
};

function DrawerTitle({ title, children, onCancelAction }) {
	if (!title) {
		return null;
	}
	const enhancedCancelAction = Object.assign({}, onCancelAction);
	if (onCancelAction) {
		enhancedCancelAction.icon = 'talend-cross';
		enhancedCancelAction.hideLabel = true;
		enhancedCancelAction.link = true;
	}
	let onCancelActionComponent = null;
	if (onCancelAction) {
		onCancelActionComponent = (
			<Action className={theme['tc-drawer-close-action']} {...enhancedCancelAction} />
		);
	}
	return (
		<div>
			<div className={theme['tc-drawer-header']}>
				<h1>{title}</h1>
				{onCancelActionComponent}
			</div>
			<div className={theme['tc-drawer-header-with-tabs']}>
				{children}
			</div>
		</div>
	);
}

DrawerTitle.propTypes = {
	title: PropTypes.string.isRequired,
	onCancelAction: PropTypes.object,
	children: PropTypes.nodes,
};

function DrawerContent({ style, children }) {
	return (
		<div style={style} className={theme['tc-drawer-content']}>
			{children}
		</div>
	);
}

DrawerContent.propTypes = {
	style: PropTypes.object,
	children: PropTypes.node,
};

function DrawerFooter({ children }) {
	return (
		<div className={theme['tc-drawer-footer']}>
			{children}
		</div>
	);
}

DrawerFooter.propTypes = {
	children: PropTypes.node,
};


function Drawer({
	stacked,
	tight,
	title,
	className,
	style,
	children,
	footerActions,
	onCancelAction,
}) {
	if (!children) {
		return null;
	}
	const enhancedFooterActions = Object.assign({}, footerActions);
	if (onCancelAction) {
		if (footerActions && footerActions.actions && footerActions.actions.left) {
			enhancedFooterActions.actions.left.push(onCancelAction);
		} else {
			enhancedFooterActions.actions.left = [].push(onCancelAction);
		}
	}
	return (
		<DrawerContainer stacked={stacked} tight={tight} className={className} style={style}>
			<DrawerTitle title={title} onCancelAction={onCancelAction} />
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto' }}>
				<DrawerContent>
					{children}
				</DrawerContent>
				<ActionBar {...enhancedFooterActions} />
			</div>
		</DrawerContainer>
	);
}

Drawer.propTypes = {
	stacked: PropTypes.bool,
	tight: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
	// footer action, see action bar for api
	footerActions: PropTypes.object.isRequired,
	onCancelAction: PropTypes.object,
};

Drawer.Animation = DrawerAnimation;
Drawer.Container = DrawerContainer;
Drawer.Title = DrawerTitle;
Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;


export default Drawer;
