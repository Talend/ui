import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import TabBar from '../../TabBar';
import WithDrawer from '../../WithDrawer';
import theme from './TwoColumns.scss';

/**
 * @param {object} props react props
 * @example
 <TwoColumns name="Hello world"></TwoColumns>
 */
function TwoColumns({ one, drawers, children, tabs, ...props }) {
	const containerCSS = classnames('tc-layout-two-columns', theme.container);
	const sidemenuCSS = classnames('tc-layout-two-columns-left', theme.sidemenu);
	const mainCSS = classnames('tc-layout-two-columns-main', theme.main);
	const style = {
		overflow: 'auto',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	};

	return (
		<div className={containerCSS} {...props}>
			<aside className={sidemenuCSS}>{one}</aside>
			<main className={mainCSS}>
				<WithDrawer drawers={drawers}>
					{tabs && <TabBar {...tabs} />}
					<div style={style}>{children}</div>
				</WithDrawer>
			</main>
		</div>
	);
}

TwoColumns.propTypes = {
	one: PropTypes.element,
	children: PropTypes.node,
	drawers: PropTypes.arrayOf(PropTypes.node),
	tabs: PropTypes.shape(TabBar.propTypes),
};

export default TwoColumns;
