import React from 'react';

/**
 * @param {object} props react props
 * @example
<<%= props.name %> name="Hello world"></<%= props.name %>>
 */
const <%= props.name %> = (props) => {
	return (<div>{props.name}</div>);
};

<%= props.name %>.propTypes = {
	name: React.PropTypes.string,
};

export default <%= props.name %>;
