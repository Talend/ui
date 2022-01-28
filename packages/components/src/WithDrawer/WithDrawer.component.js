import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';

import theme from './withDrawer.scss';

const STYLES = {
	entering: { transform: 'translateX(0%)' },
	entered: { transform: 'translateX(0%)' },
	exiting: { transform: 'translateX(100%)' },
	exited: { transform: 'translateX(100%)' },
};

function Animation(props) {
	const { children, ...rest } = props;

	return (
		<Transition in appear timeout={500} {...rest}>
			{transitionState => {
				const style = {
					transition: 'transform 350ms ease-in-out',
					...STYLES[transitionState],
				};
				return children({
					style,
					transitioned: transitionState === 'entered',
					transitionState,
				});
			}}
		</Transition>
	);
}

Animation.propTypes = {
	children: PropTypes.node,
};

/**
 * The Layout component is a container
 * that should follow the body of your App.
 * If the Layout is not after the body you have to
 * add some CSS
 * @example
body > div {
	max-height: 100vh;
	overflow: hidden;
	display: flex;
	width: 100vw;
}
 * @param {object} props react props
 * @example
 <Layout mode="TwoColumns" one={one} two={two}></Layout>
 */
export function WithDrawer({ drawers, children }) {
	return (
		<div className={theme['tc-with-drawer']}>
			{children}
			<TransitionGroup className={theme['tc-with-drawer-container']}>
				{drawers &&
					drawers.map((drawer, key) => (
						<Animation key={key}>
							{({ style }) => (
								<div className="tc-with-drawer-wrapper" style={style}>
									{drawer}
								</div>
							)}
						</Animation>
					))}
			</TransitionGroup>
		</div>
	);
}

WithDrawer.displayName = 'WithDrawer';

WithDrawer.propTypes = {
	drawers: PropTypes.arrayOf(PropTypes.element),
	children: PropTypes.node,
};

export default WithDrawer;
