import React from 'react';

/**
 * @param {object} props react props
 * @example
<<%= props.name %> name="Hello world"></<%= props.name %>>
 */
class <%= props.name %> extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (<div>{this.props.name}</div>);
	}
}

export default <%= props.name %>;
