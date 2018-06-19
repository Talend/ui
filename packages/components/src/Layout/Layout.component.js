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
	const injected = Inject.all(getComponent, components);
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
	const injectedHeader = injected('header');
	const injectedFooter = injected('footer');

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

	const safeHeader = Inject.getReactElement(getComponent, header);
	const safeSubHeader = Inject.getReactElement(getComponent, subHeader);
	const safeFooter = Inject.getReactElement(getComponent, footer);
	return (
		<div id={id} className={appCSS}>
			{(safeHeader || injectedHeader) && (
				<header role="banner" className={headerCSS}>
					{safeHeader || injectedHeader}
				</header>
			)}
			{injected('after-header')}
			{safeSubHeader}
			{injected('after-subheader')}
			{Component && (
				<Component drawers={withInjectDrawers} tabs={tabs} injected={injected} {...rest}>
					{children}
				</Component>
			)}
			{injected('after-content')}
			{(safeFooter || injectedFooter) && (
				<footer role="contentinfo" className={footerCSS}>
					{safeFooter || injectedFooter}
				</footer>
			)}
		</div>
	);
}

Layout.displayName = 'Layout';

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
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

export default Layout;
