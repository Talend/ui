import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';

import TabBar from '../../TabBar';
import WithDrawer from '../../WithDrawer';
import Inject from '../../Inject';
import theme from './TwoColumns.scss';

/**
 * @param {object} props react props
 * @example
 <TwoColumns name="Hello world"></TwoColumns>
 */
function TwoColumns({ one, drawers, children, tabs, getComponent, ...props }) {
	const containerCSS = classnames('tc-layout-two-columns', theme.container);
	const sidemenuCSS = classnames('tc-layout-two-columns-left', theme.sidemenu);
	const mainCSS = classnames('tc-layout-two-columns-main', theme.main);
	const style = {
		overflow: 'auto',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	};
	const safeOne = Inject.getReactElement(getComponent, one);

	return (
		<div className={containerCSS} {...omit(props, 'getComponents')}>
			<div className={sidemenuCSS} id="tc-layout-side-menu" tabIndex="-1">
				{safeOne}
			</div>
			<div className={mainCSS} role="main" id="tc-layout-main" tabIndex="-1">
				<WithDrawer drawers={drawers}>
					{tabs && <TabBar {...tabs} />}
					<div style={style}>{children}</div>
				</WithDrawer>
			</div>
		</div>
	);
}

TwoColumns.displayName = 'TwoColumns';

TwoColumns.propTypes = {
	one: Inject.getReactElement.propTypes,
	children: PropTypes.node,
	drawers: PropTypes.arrayOf(PropTypes.node),
	tabs: PropTypes.shape(TabBar.propTypes),
	getComponent: PropTypes.func,
};

export default TwoColumns;
