import React from 'react';

function ReactCSSTransitionGroup(props) {
	return (
		<div className="react-addons-css-transition-group">
			{props.children}
		</div>
	);
}
ReactCSSTransitionGroup.propTypes = {
	children: React.PropTypes.arrayOf(React.PropTypes.element),
};

export default ReactCSSTransitionGroup;
