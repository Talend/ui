import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';

import theme from './OneColumn.module.scss';
import { FloatingDrawer, Tabs } from '@talend/design-system';

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
		<div
			role="main"
			id="tc-layout-main"
			tabIndex="-1"
			className={container}
			{...omit(props, 'getComponent')}
		>
			<FloatingDrawer.Container>
				{tabs && <Tabs {...tabs} />}
				<div style={style}>{children}</div>
				{drawers.map((drawer, index) => (
					<FloatingDrawer key={index} visible>
						{drawer}
					</FloatingDrawer>
				))}
			</FloatingDrawer.Container>
		</div>
	);
}

OneColumn.displayName = 'OneColumn';

OneColumn.propTypes = {
	children: PropTypes.node,
	drawers: PropTypes.arrayOf(PropTypes.node),
	tabs: PropTypes.shape(TabBar.propTypes),
};

export default OneColumn;
