import React from 'react';
import classnames from 'classnames';
import theme from './OneColumn.scss';

/**
 * @param {object} props react props
 * @example
<OneColumn name="Hello world"></OneColumn>
 */
function OneColumn({ children, ...props }) {
	const container = classnames(
		'tc-layout-one-column',
		theme.main
	);
	return (<div className={container} {...props}>{children}</div>);
}

OneColumn.propTypes = {
	children: React.PropTypes.node,
};

export default OneColumn;
