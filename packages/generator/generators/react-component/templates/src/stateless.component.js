import React, { PropTypes } from 'react';

function <%= props.name %>(props) {
	return (
		<div>{props.name}</div>
	);
}

<%= props.name %>.propTypes = {
	name: PropTypes.string,
};

export default <%= props.name %>;
