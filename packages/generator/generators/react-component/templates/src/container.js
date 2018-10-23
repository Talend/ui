import React from 'react';
// import PropTypes from 'prop-types';
import Component from './<%= props.name %>.component';

class <%= props.name %> extends React.Component {
	static displayName = 'Container(<%= props.name %>)';
	static propTypes = {
		// ...cmfConnect.propTypes,
	};

	constructor(props) {
		super(props);
		this.state = {};
		// this.onEvent = this.onEvent.bind(this);
	}

	// onEvent(event) {
	// 	if (this.props.onEvent) {
	// 		this.props.onEvent(event);
	// 	}
	// }

	render() {
		return <Component {...this.props} />;
	}
}

export default <%= props.name %>;
