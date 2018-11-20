import React from 'react';
// import PropTypes from 'prop-types';

import Component from './ErrorPanel.component';

class ErrorPanel extends React.Component {
	static displayName = 'Container(ErrorPanel)';
	static propTypes = {
		
	};
	static ACTION_TYPE_ON_EVENT = 'ErrorPanel.onClick';

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
			type: ErrorPanel.ACTION_TYPE_ON_EVENT,
			componentId: this.props.componentId,
		});
	}

	render() {
		const props = this.props;
		return (
			<Component
				{...props}
				onClick={this.onClick}
			/>
		);
	}
}

export default ErrorPanel;
