import React from 'react';
// import PropTypes from 'prop-types';

import Component from './ErrorFeedBack.component';
import onError from '../../onError';

class ErrorFeedBack extends React.Component {
	static displayName = 'Container(ErrorFeedBack)';

	constructor(props) {
		super(props);
		this.state = {
			errors: onError.getErrors(),
		};
		onError.subscribe(errors => this.setState({ errors }));
	}

	render() {
		return <Component errors={this.state.errors} />;
	}
}

export default ErrorFeedBack;
