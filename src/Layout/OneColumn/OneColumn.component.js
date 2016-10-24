import React from 'react';

/**
 * @param {object} props react props
 * @example
<OneColumn name="Hello world"></OneColumn>
 */
function OneColumn(props) {
	return (<div>{props.one}</div>);
}

OneColumn.propTypes = {
	one: React.PropTypes.element,
};

export default OneColumn;
