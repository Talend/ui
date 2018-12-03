import React from 'react';
// import PropTypes from 'prop-types';
<%- props.cmfConnect.import %>
import Component from './<%= props.name %>.component';

class <%= props.name %> extends React.Component {
	static displayName = 'Container(<%= props.name %>)';
	static propTypes = {
		<%- props.cmfConnect.propTypes %>
	};
	static ACTION_TYPE_ON_EVENT = '<%= props.name %>.onClick';

	constructor(props) {
		super(props);
		this.state = {};
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		if (this.props.onClick) {
			this.props.onClick(event);
		}
		this.props.dispatch({
			type: <%= props.name %>.ACTION_TYPE_ON_EVENT,
			componentId: this.props.componentId,
		});
	}

	render() {
		<%- props.cmfConnect.omitProps %>
		return (
			<Component
				{...props}
				onClick={this.onClick}
			/>
		);
	}
}

export default <%= props.name %>;
