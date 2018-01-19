import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import theme from './OneColumn.scss';
import TabBar from '../../TabBar';
import WithDrawer from '../../WithDrawer';

/**
 * @param {object} props react props
 * @example
 <OneColumn name="Hello world"></OneColumn>
 */
function OneColumn({ drawers, children, tabs, ...props }) {
	const container = classnames('tc-layout-one-column', theme.main);
	const style = {
		overflow: 'auto',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	};
	return (
		<main role="main" className={container} {...props}>
			<WithDrawer drawers={drawers}>
				{tabs && <TabBar {...tabs} />}
				<div style={style}>{children}</div>
			</WithDrawer>
		</main>
	);
}

OneColumn.displayName = 'OneColumn';

OneColumn.propTypes = {
	children: PropTypes.node,
	drawers: PropTypes.arrayOf(PropTypes.node),
	tabs: PropTypes.shape(TabBar.propTypes),
};

export default OneColumn;
