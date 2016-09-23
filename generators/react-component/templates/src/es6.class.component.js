import React from 'react';

/**
 * @param {object} props react props
 * @example
<<%= props.name %> name="Hello world"></<%= props.name %>>
 */
class <%= props.name %> extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>{this.props.name}</div>);
	}
}

<%= props.name %>.propTypes = {
	name: React.PropTypes.string,
};

export default <%= props.name %>;
