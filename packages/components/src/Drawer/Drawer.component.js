import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import ActionBar from '../ActionBar';

import theme from './Drawer.scss';


function DrawerTitle({ title }) {
	if (!title) {
		return null;
	}
	return (
		<div className={theme.header}>
			<h1>{title}</h1>
		</div>
	);
}

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


function DrawerContent({ style, children }) {
	return (
		<div style={style} className={theme.content}>
			{children}
		</div>
	);
}

function DrawerFooter({ children }) {
	return (
		<div className={theme['tc-drawer-footer']}>
			{children}
		</div>
	);
}

DrawerAnimation.propTypes = {
	children: PropTypes.node,
};

function Drawer({ stacked, tight, title, className, style, children, footer }) {
	if (!children) {
		return null;
	}
	return (
		<DrawerContainer stacked={stacked} tight={tight} className={className} style={style}>
			<DrawerTitle title={title} />
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
				<DrawerContent>
					{children}
				</DrawerContent>
				<ActionBar {...footer} />
			</div>
		</DrawerContainer>
	);
}

Drawer.Animation = DrawerAnimation;
Drawer.Container = DrawerContainer;
Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;

Drawer.propTypes = {
	stacked: PropTypes.bool,
	tight: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
};

export default Drawer;
