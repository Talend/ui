import React, { PropTypes } from 'react';

const <%= props.name %> = (props) => {
	return (
		<div>{props.name}</div>
	);
};

<%= props.name %>.propTypes = {
	name: PropTypes.string,
};

export default <%= props.name %>;
