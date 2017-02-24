import React, { PropTypes } from 'react';
import Drawer from '../Drawer';

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
function WithDrawer({ drawers, children, ...rest }) {
	return (
		<div style={{ height: '100%', position: 'relative' }}>
			<div>
				{children}
			</div>
			<Drawer.Animation style={{ height: '100%', position: 'absolute', top: 0, right: 0 }}>
				{drawers && drawers.map((drawer, key) => (
					<div drawer key={key} style={{ height: '100%' }} >
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
