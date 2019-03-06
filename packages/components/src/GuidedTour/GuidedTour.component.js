import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './GuidedTour.scss';

function GuidedTour({ onRequestClose, isOpen = true, steps }) {

	return (
		<Tour
			steps={steps}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
		/>
	);
}

GuidedTour.displayName = 'GuidedTour';

if (process.env.NODE_ENV !== 'production') {
	GuidedTour.propTypes = {
		// id: PropTypes.string,
		// className: PropTypes.string,
		steps: PropTypes.arrayOf(PropTypes.shape({
			selector: PropTypes.string,
			content: PropTypes.oneOfType([
				PropTypes.node,
				PropTypes.element,
				PropTypes.func,
			]).isRequired,
			position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
			action: PropTypes.func,
			style: PropTypes.object,
			stepInteraction: PropTypes.bool,
		})),
	};
}

export default GuidedTour;
