import React from 'react';
import PropTypes from 'prop-types';


function ReactCSSTransitionGroup({ children, ...props }) {
	return (
		<div className="react-addons-css-transition-group" {...props}>
			{children}
		</div>
	);
}
ReactCSSTransitionGroup.propTypes = {
	children: PropTypes.arrayOf(React.PropTypes.element),
};

export default ReactCSSTransitionGroup;
