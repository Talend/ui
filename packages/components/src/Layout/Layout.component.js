import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Inject from '../Inject';
import TabBar from '../TabBar';
import OneColumn from './OneColumn';
import TwoColumns from './TwoColumns';
import SkipLinks from './SkipLinks';

import theme from './Layout.scss';
import {
	DISPLAY_MODES,
	DISPLAY_MODE_ONE_COLUMN,
	DISPLAY_MODE_TWO_COLUMNS,
	TALEND_T7_THEME_CLASSNAME,
} from './constants';

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
function Layout({
	id,
	header,
	subHeader,
	content,
	footer,
	mode,
	drawers,
	tabs,
	hasTheme,
	children,
	getComponent,
	...rest
}) {
	const appCSS = classnames('tc-layout', theme.layout, hasTheme && TALEND_T7_THEME_CLASSNAME);
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

	const safeDrawers = Inject.getReactElement(getComponent, drawers);
	const safeHeader = Inject.getReactElement(getComponent, header);
	const safeSubHeader = Inject.getReactElement(getComponent, subHeader);
	const safeContent = Inject.getReactElement(getComponent, content);
	const safeFooter = Inject.getReactElement(getComponent, footer);

	return (
		<div id={id} className={appCSS}>
			<div className={theme['skip-links']}>
				<SkipLinks />
			</div>
			{safeHeader && (
				<header key="banner" role="banner" className={headerCSS} z-index="10">
					{safeHeader}
				</header>
			)}
			{safeSubHeader && (
				<div key="subheader" className="subheader">
					{safeSubHeader}
				</div>
			)}
			<Component key="main" drawers={safeDrawers} tabs={tabs} getComponent={getComponent} {...rest}>
				{safeContent}
				{children}
			</Component>
			{safeFooter && (
				<footer key="footer" role="contentinfo" className={footerCSS}>
					{safeFooter}
				</footer>
			)}
		</div>
	);
}

Layout.displayName = 'Layout';

Layout.propTypes = {
	id: PropTypes.string,
	header: Inject.getReactElement.propTypes,
	content: Inject.getReactElement.propTypes,
	footer: Inject.getReactElement.propTypes,
	subHeader: Inject.getReactElement.propTypes,
	mode: PropTypes.oneOf(DISPLAY_MODES),
	drawers: PropTypes.arrayOf(PropTypes.element),
	tabs: PropTypes.shape(TabBar.propTypes),
	hasTheme: PropTypes.bool,
	children: PropTypes.node,
	getComponent: PropTypes.func,
};

export default Layout;
