import React from 'react';
import classnames from 'classnames';

import theme from './OneColumn.scss';
import WithDrawer from '../../WithDrawer';

/**
 * @param {object} props react props
 * @example
<OneColumn name="Hello world"></OneColumn>
 */
function OneColumn({ drawers, children, ...props }) {
	const container = classnames(
		'tc-layout-one-column',
		theme.main,
	);
	return (
		<div className={container} {...props}>
			<WithDrawer drawers={drawers}>
				<div style={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
					{children}
				</div>
			</WithDrawer>
		</div>
	);
}

OneColumn.propTypes = {
	children: React.PropTypes.node,
};

export default OneColumn;
