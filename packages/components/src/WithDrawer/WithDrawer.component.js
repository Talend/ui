import React, { PropTypes } from 'react';
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
			<Drawer.Animation className={theme['tc-with-drawer-container']}>
				{drawers && drawers.map((drawer, key) => (
					<div key={key} className={theme['tc-with-drawer-wrapper']}>
						{drawer}
					</div>
				))}
			</Drawer.Animation>
		</div>
	);
}

WithDrawer.propTypes = {
	drawers: PropTypes.arrayOf(PropTypes.element),
	children: PropTypes.node,
};

export default WithDrawer;
