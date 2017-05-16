import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import ActionBar from '../ActionBar';
import Action from '../Actions/Action';

import theme from './Drawer.scss';

function DrawerAnimation({ children }) {
	return (
		<ReactCSSTransitionGroup
			transitionName="tc-with-drawer-wrapper"
			transitionAppear
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

function DrawerContainer({ stacked, className, children, withTransition = true, ...rest }) {
	const drawerContainerClasses = classnames(
		theme['tc-drawer'],
		className,
		'tc-drawer',
		{
			[theme['tc-drawer-transition']]: withTransition,
			'tc-drawer-transition': withTransition,
		},
		{
			[theme['drawer-stacked']]: stacked,
			stacked,
		});
	return (
		<div className={drawerContainerClasses} {...rest}>
			<div className={theme['tc-drawer-container']}>
				{children}
			</div>
		</div>
	);
}

DrawerContainer.propTypes = {
	stacked: PropTypes.bool,
	withTransition: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export function cancelActionComponent(onCancelAction) {
	if (!onCancelAction) {
		return null;
	}
	const enhancedCancelAction = Object.assign({
		icon: 'talend-cross',
		hideLabel: true,
		link: true,
	}, onCancelAction);
	return <Action className={theme['tc-drawer-close-action']} {...enhancedCancelAction} />;
}

function DrawerTitle({ title, children, onCancelAction }) {
	if (!title) {
		return null;
	}
	return (
		<div>
			<div className={theme['tc-drawer-header']}>
				<h1>{title}</h1>
				{cancelActionComponent(onCancelAction)}
			</div>
			<div className={theme['tc-drawer-header-with-tabs']}>
				{children}
			</div>
		</div>
	);
}

DrawerTitle.propTypes = {
	title: PropTypes.string.isRequired,
	onCancelAction: PropTypes.shape(Action.propTypes),
	children: PropTypes.node,
};

function DrawerContent({ children, ...rest }) {
	return (
		<div className={theme['tc-drawer-content']} {...rest}>
			{children}
		</div>
	);
}

DrawerContent.propTypes = {
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

function combinedFooterActions(onCancelAction, footerActions) {
	if (!onCancelAction) {
		return footerActions;
	}
	const enhancedFooterActions = Object.assign({}, footerActions);
	if (footerActions && footerActions.actions && footerActions.actions.left) {
		enhancedFooterActions.actions.left.push(onCancelAction);
	} else {
		enhancedFooterActions.actions.left = [].push(onCancelAction);
	}
	return enhancedFooterActions;
}

function Drawer({
	stacked,
	title,
	className,
	style,
	children,
	footerActions,
	onCancelAction,
	withTransition = true,
}) {
	if (!children) {
		return null;
	}
	return (
		<DrawerContainer
			stacked={stacked}
			className={className}
			style={style}
			withTransition={withTransition}
		>
			<DrawerTitle title={title} onCancelAction={onCancelAction} />
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
				<DrawerContent>
					{children}
				</DrawerContent>
				<ActionBar {...combinedFooterActions(onCancelAction, footerActions)} />
			</div>
		</DrawerContainer>
	);
}

Drawer.propTypes = {
	stacked: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
	// footer action, see action bar for api
	footerActions: PropTypes.shape(ActionBar.propTypes).isRequired,
	onCancelAction: PropTypes.shape(Action.propTypes),
	withTransition: PropTypes.bool,
};

Drawer.Animation = DrawerAnimation;
Drawer.Container = DrawerContainer;
Drawer.Title = DrawerTitle;
Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;
Drawer.FooterStyle = theme['tc-drawer-footer'];

export default Drawer;
