import React from 'react';
import theme from './TwoColumns.scss';

/**
 * @param {object} props react props
 * @example
<TwoColumns name="Hello world"></TwoColumns>
 */
function TwoColumns(props) {
	return (
		<div className={theme.container}>
			<div className={theme.sidemenu}>
				{props.one}
			</div>
			<div className={theme.main}>
				{props.two}
			</div>
		</div>
	);
}

TwoColumns.propTypes = {
	one: React.PropTypes.element,
	two: React.PropTypes.element,
};

export default TwoColumns;
