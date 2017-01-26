import React from 'react';
import classnames from 'classnames';
import theme from './TwoColumns.scss';

/**
 * @param {object} props react props
 * @example
<TwoColumns name="Hello world"></TwoColumns>
 */
function TwoColumns(props) {
	const containerCSS = classnames(
		'tc-layout-two-columns',
		theme.container
	);
	const sidemenuCSS = classnames(
		'tc-layout-two-columns-left',
		theme.sidemenu
	);
	const mainCSS = classnames(
		'tc-layout-two-columns-main',
		theme.main
	);

	return (
		<div className={containerCSS}>
			<div className={sidemenuCSS}>
				{props.one}
			</div>
			<div className={mainCSS}>
				{props.children}
			</div>
		</div>
	);
}

TwoColumns.propTypes = {
	one: React.PropTypes.element,
	children: React.PropTypes.element,
};

export default TwoColumns;
