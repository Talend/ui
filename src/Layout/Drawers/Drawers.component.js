import React, { PropTypes } from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import theme from './Drawers.scss';

function Drawers(props) {
	const container = classnames(theme.container, 'tc-layout-drawers');
	const drawerClasses = classnames(theme.drawer, 'tc-layout-drawers-drawer');
	return (
		<div className={container}>
			<ReactCSSTransitionGroup
				transitionName="tc-layout-drawer"
				transitionAppear
				transitionAppearTimeout={1000}
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				{props.drawers.map((drawer, key) => (
					<div key={key} className={drawerClasses}>
						{drawer}
					</div>
				))}
			</ReactCSSTransitionGroup>
		</div>
	);
}

Drawers.propTypes = {
	drawers: PropTypes.arrayOf(PropTypes.element),
};
Drawers.defaultProps = {
	drawers: [],
};

export default Drawers;
