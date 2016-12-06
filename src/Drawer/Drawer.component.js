import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import theme from './Drawer.scss';

function Drawer({ className, style, children }) {
	const drawerClasses = classnames(theme.drawer, className, 'tc-drawer');
	return (
		<ReactCSSTransitionGroup
			transitionName="tc-drawer"
			transitionAppear
			transitionAppearTimeout={1000}
			transitionLeaveTimeout={1000}
		>
			<div className={drawerClasses} style={style}>
				{children}
			</div>
		</ReactCSSTransitionGroup>
	);
}

Drawer.propTypes = {
	children: PropTypes.node,
	style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
};

export default Drawer;
