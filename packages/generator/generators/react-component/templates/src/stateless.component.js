import React from 'react';
import PropTypes from 'prop-types';

function <%= props.name %>(props) {
	return (
		<div>{props.name}</div>
	);
}

<%= props.name %>.displayName = '<%= props.name %>';
<%= props.name %>.propTypes = {
	name: PropTypes.string,
};

export default <%= props.name %>;
