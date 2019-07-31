import React from 'react';
import ErrorFeedBack from '../ErrorFeedBack';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { errors: [] };
	}

	componentDidCatch(error) {
		this.setState(state => ({ errors: state.errors.concat(error) }));
	}

	render() {
		if (this.state.errors.length > 1) {
			// You can render any custom fallback UI
			return <ErrorFeedBack errors={this.state.errors} />;
		}

		return this.props.children;
	}
}
