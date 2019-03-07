import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './GuidedTour.scss';

function GuidedTour({ className, onRequestClose, isOpen, steps }) {
	return (
		<Tour
			className={classNames(theme['guided-tour'], 'guided-tour', className)}
			maskClassName={classNames(theme.mask, 'guided-tour-mask')}
			highlightedMaskClassName={classNames(theme['highlighted-mask'], 'guided-tour-highlight-mask')}
			steps={steps}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			showNavigationNumber
			maskSpace={2}
			rounded={2}
			lastStepNextButton={<button className={'btn btn-info'}>Let me try</button>}
		/>
	);
}

GuidedTour.displayName = 'GuidedTour';

if (process.env.NODE_ENV !== 'production') {
	GuidedTour.propTypes = {
		className: PropTypes.string,
		steps: PropTypes.arrayOf(
			PropTypes.shape({
				selector: PropTypes.string,
				content: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
					.isRequired,
				position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
				action: PropTypes.func,
				style: PropTypes.object,
				stepInteraction: PropTypes.bool,
			}),
		).isRequired,
		isOpen: PropTypes.func,
		onRequestClose: PropTypes.func,
	};
}

export default GuidedTour;
