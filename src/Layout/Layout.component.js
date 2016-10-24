import React from 'react';
import AppHeaderBar from '../AppHeaderBar';
import OneColumn from './OneColumn';
import TwoColumns from './TwoColumns';
import theme from './Layout.scss';

/**
 * @param {object} props react props
 * @example
 <Layout mode="TwoColumns" one={one} two={two}></Layout>
 */
function Layout({ header, mode, ...rest }) {
	return (
		<div className={theme.app}>
			<div className={theme.header}>
				<AppHeaderBar {...header} />
			</div>
			<div className={theme.content}>
				{mode === 'OneColumn' ? (<OneColumn {...rest} />) : null}
				{mode === 'TwoColumns' ? (<TwoColumns {...rest} />) : null}
			</div>
		</div>
	);
}

Layout.propTypes = {
	header: React.PropTypes.shape(AppHeaderBar.propTypes),
	mode: React.PropTypes.oneOf(['OneColumn', 'TwoColumns']),
	twoColumns: React.PropTypes.shape(TwoColumns.propTypes),
};

export default Layout;
