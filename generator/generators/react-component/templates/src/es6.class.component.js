import React, { PropTypes } from 'react';

class <%= props.name %> extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>{this.props.name}</div>
		);
	}
}

export default <%= props.name %>;
