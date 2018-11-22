import React from 'react';
import PropTypes from 'prop-types';
<%- props.cmfConnect.import %>
<%- props.theme %>

function <%= props.name %>(props) {
	return (
		<div>
			{props.name}
		</div>
	);
}

<%= props.name %>.displayName = '<%= props.name %>';
<%= props.name %>.propTypes = {
	name: PropTypes.string,
	<%- props.cmfConnect.propTypes %>
};

export default <%= props.name %>;
