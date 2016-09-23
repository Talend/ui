import React from 'react';

/**
 * @example
<<%= props.name %>></<%= props.name %>>
 */
const <%= props.name %> = React.createClass({
	propTypes: {
		name: React.PropTypes.string,
	},
	render() {
		return (<div>{this.props.name}</div>);
	}
});

export default <%= props.name %>;
