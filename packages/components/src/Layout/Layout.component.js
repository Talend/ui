import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TabBar from '../TabBar';
import OneColumn from './OneColumn';
import TwoColumns from './TwoColumns';
import theme from './Layout.scss';
import { DISPLAY_MODES, DISPLAY_MODE_ONE_COLUMN, DISPLAY_MODE_TWO_COLUMNS } from './constants';

/**
 * The Layout component is a container
 * that should follow the body of your App.
 * If the Layout is not after the body you have to
 * add some CSS
 * @example
 body > div {
	display: flex;
	width: 100vw;
	max-height: 100vh;
	overflow: hidden;
}
 * @param {object} props react props
 * @example
 <Layout mode="TwoColumns" one={one} two={two}></Layout>
 */
function Layout({ id, header, subHeader, footer, mode, drawers, tabs, hasTheme, children, ...rest }) {
	const attrs = {};
	if (id) {
		attrs.id = id;
	}
	const appCSS = classnames('tc-layout', theme.layout, hasTheme && theme.t7);
	const headerCSS = classnames('tc-layout-header', theme.header);
	const footerCSS = classnames('tc-layout-footer', theme.footer);
	let Component;
	switch (mode) {
	case DISPLAY_MODE_ONE_COLUMN:
		Component = OneColumn;
		break;
	case DISPLAY_MODE_TWO_COLUMNS:
		Component = TwoColumns;
		break;
	default:
		Component = OneColumn;
	}
	return (
		<div {...attrs} className={appCSS}>
			{header && <header role="banner" className={headerCSS}>{header}</header>}
			{subHeader}
			{Component && (
				<Component drawers={drawers} tabs={tabs} {...rest}>
					{children}
				</Component>
			)}
			{footer && (
				<footer role="contentinfo" className={footerCSS}>
					{footer}
				</footer>
			)}
		</div>
	);
}

Layout.propTypes = {
	id: PropTypes.string,
	header: PropTypes.element,
	footer: PropTypes.element,
	subHeader: PropTypes.element,
	mode: PropTypes.oneOf(DISPLAY_MODES),
	drawers: PropTypes.arrayOf(PropTypes.element),
	tabs: PropTypes.shape(TabBar.propTypes),
	hasTheme: PropTypes.bool,
	children: PropTypes.node,
};

export default Layout;
