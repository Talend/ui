import React, { PropTypes } from 'react';
import classnames from 'classnames';
import OneColumn from './OneColumn';
import TwoColumns from './TwoColumns';
import theme from './Layout.scss';
import {
	DISPLAY_MODES,
	DISPLAY_MODE_ONE_COLUMN,
	DISPLAY_MODE_TWO_COLUMNS,
} from './constants';

/**
 * The Layout component is a container
 * that should follow the body of your App.
 * If the Layout is not after the body you have to
 * add some CSS
 * @example
body > div {
	max-height: 100vh;
	overflow: hidden;
	display: flex;
	width: 100vw;
}
 * @param {object} props react props
 * @example
 <Layout mode="TwoColumns" one={one} two={two}></Layout>
 */
function Layout({ header, footer, mode, drawers, children, ...rest }) {
	const appCSS = classnames(
		'tc-layout',
		theme.layout,
	);
	const headerCSS = classnames(
		'tc-layout-header',
		theme.header,
	);
	const footerCSS = classnames(
		'tc-layout-footer',
		theme.footer,
	);
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
		<div className={appCSS}>
			{header &&
				<div className={headerCSS}>{header}</div>
			}
			{Component &&
				<Component drawers={drawers} {...rest}>{children}</Component>
			}
			{footer &&
				<footer role="contentinfo" className={footerCSS}>{footer}</footer>
			}
		</div>
	);
}

Layout.propTypes = {
	header: PropTypes.element,
	footer: PropTypes.element,
	mode: PropTypes.oneOf(DISPLAY_MODES),
	drawers: PropTypes.arrayOf(PropTypes.element),
	children: PropTypes.node,
};

export default Layout;
