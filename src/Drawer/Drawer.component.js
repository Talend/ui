import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import theme from './Drawer.scss';

function DrawerAnimation({ children }) {
	return (
		<ReactCSSTransitionGroup
			transitionName="tc-drawer"
			transitionAppear
			transitionAppearTimeout={230}
			transitionLeaveTimeout={230}
		>
			{children}
		</ReactCSSTransitionGroup>
	);
}

DrawerAnimation.propTypes = {
	children: PropTypes.node,
};

function Drawer({ className, style, children }) {
	const drawerClasses = classnames(theme.drawer, className, 'tc-drawer');
	return (
		<div className={drawerClasses} style={style}>
			{children}
		</div>
	);
}

Drawer.Animation = DrawerAnimation;

Drawer.propTypes = {
	children: PropTypes.node,
	style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
};

export default Drawer;
