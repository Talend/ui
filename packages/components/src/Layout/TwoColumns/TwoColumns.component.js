import React from 'react';
import classnames from 'classnames';

import WithDrawer from '../../WithDrawer';
import theme from './TwoColumns.scss';

/**
 * @param {object} props react props
 * @example
<TwoColumns name="Hello world"></TwoColumns>
 */
function TwoColumns({ one, drawers, children, ...props }) {
	const containerCSS = classnames(
		'tc-layout-two-columns',
		theme.container,
	);
	const sidemenuCSS = classnames(
		'tc-layout-two-columns-left',
		theme.sidemenu,
	);
	const mainCSS = classnames(
		'tc-layout-two-columns-main',
		theme.main,
	);

	return (
		<div className={containerCSS} {...props}>
			<div className={sidemenuCSS}>{one}</div>
			<div className={mainCSS}>
				<WithDrawer drawers={drawers}>
					<div style={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
						{children}
					</div>
				</WithDrawer>
			</div>
		</div>
	);
}

TwoColumns.propTypes = {
	one: React.PropTypes.element,
	children: React.PropTypes.element,
	drawers: React.PropTypes.arrayOf(React.PropTypes.node),
};

export default TwoColumns;
