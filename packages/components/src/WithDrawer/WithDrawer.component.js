import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import get from 'lodash/get';

import Drawer from '../Drawer';

import theme from './withDrawer.scss';

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
function WithDrawer({ drawers, children }) {
	return (
		<div className={theme['tc-with-drawer']}>
			{children}
			<TransitionGroup appear className={theme['tc-with-drawer-container']}>
				{drawers &&
					drawers.map((drawer, key) => (
						<Drawer.Animation
							withTransition={
								get(drawer, 'props.withTransition', true) &&
								get(drawer, 'props.route.state.withTransition')
							}
							key={get(drawer, 'props.route.path', key)}
							className="tc-with-drawer-wrapper"
						>
							{drawer}
						</Drawer.Animation>
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
