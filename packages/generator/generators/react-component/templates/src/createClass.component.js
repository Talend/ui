import React from 'react';
import PropTypes from 'prop-types';

const <%= props.name %> = React.createClass({
	propTypes: {
		name: PropTypes.string,
	},
	render() {
		return (
			<div>{this.props.name}</div>
		);
	}
});

export default <%= props.name %>;
