import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Inject from '../Inject';
import TabBar from '../TabBar';
import OneColumn from './OneColumn';
import TwoColumns from './TwoColumns';
import theme from './Layout.scss';
import {
	DISPLAY_MODES,
	DISPLAY_MODE_ONE_COLUMN,
	DISPLAY_MODE_TWO_COLUMNS,
	TALEND_T7_THEME_CLASSNAME,
} from './constants';

function getDrawers(getComponent, drawers, components) {
	let withInjectDrawers = [];
	if (Array.isArray(drawers)) {
		withInjectDrawers = withInjectDrawers.concat(drawers);
	}
	if (components && components.drawers) {
		withInjectDrawers = withInjectDrawers.concat(Inject.map(getComponent, components.drawers));
	}
	if (withInjectDrawers.length === 0) {
		withInjectDrawers = undefined;
	}
	return withInjectDrawers;
}

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
	footer,
	mode,
	drawers,
	tabs,
	hasTheme,
	children,
	getComponent,
	components,
	...rest
}) {
	const appCSS = classnames('tc-layout', theme.layout, hasTheme && TALEND_T7_THEME_CLASSNAME);
	const headerCSS = classnames('tc-layout-header', theme.header);
	const footerCSS = classnames('tc-layout-footer', theme.footer);
	let Component;
	const inject = Inject.all(getComponent, components);
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

	const safeDrawers = getDrawers(getComponent, drawers, components);
	const safeHeader = Inject.getReactElement(getComponent, header);
	const safeSubHeader = Inject.getReactElement(getComponent, subHeader);
	const safeFooter = Inject.getReactElement(getComponent, footer);

	return (
		<div id={id} className={appCSS}>
			{safeHeader && (
				<header role="banner" className={headerCSS}>
					{safeHeader}
				</header>
			)}
			{safeSubHeader && (
				<div className="subheader">
					{safeSubHeader}
				</div>
			)}
			{Component && (
				<Component drawers={safeDrawers} tabs={tabs} inject={inject} {...rest}>
					{children}
				</Component>
			)}
			{safeFooter && (
				<footer role="contentinfo" className={footerCSS}>
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
	footer: Inject.getReactElement.propTypes,
	subHeader: Inject.getReactElement.propTypes,
	mode: PropTypes.oneOf(DISPLAY_MODES),
	drawers: PropTypes.arrayOf(PropTypes.element),
	tabs: PropTypes.shape(TabBar.propTypes),
	hasTheme: PropTypes.bool,
	children: PropTypes.node,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

export default Layout;
