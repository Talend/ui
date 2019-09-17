import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

export const DEFAULT_TRANSITION_DURATION = 300;

const defaultStyle = {
	transition: `opacity ${DEFAULT_TRANSITION_DURATION}ms ease-in-out`,
	opacity: 0,
	display: 'flex',
	overflow: 'auto',
	height: '100%',
	width: '100%',
};

const transitionStyles = {
	entering: { opacity: 0 },
	entered: { opacity: 1 },
	exited: { display: 'none' },
};

export function StepperTransition({ children, active }) {
	if (!children) {
		return null;
	}

	return (
		<Transition timeout={DEFAULT_TRANSITION_DURATION} in={active}>
			{state => (
				<div
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					{children}
				</div>
			)}
		</Transition>
	);
}

StepperTransition.propTypes = {
	children: PropTypes.element,
	active: PropTypes.bool.isRequired,
};
