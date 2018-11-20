import React from 'react';
// import PropTypes from 'prop-types';

import Component from './ErrorPanel.component';

class ErrorPanel extends React.Component {
	static displayName = 'Container(ErrorPanel)';
	static propTypes = {};

	constructor(props) {
		super(props);
		this.state = { hidden: true };
		this.onClickDetails = this.onClickDetails.bind(this);
	}

	onClickDetails() {
		this.setState({ hidden: !this.state.hidden });
	}

	render() {
		const props = this.props;
		return <Component {...props} hidden={this.state.hidden} onClickDetails={this.onClickDetails} />;
	}
}

export default ErrorPanel;
