import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorFeedBack from '../ErrorFeedBack';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { errors: [] };
	}

	componentDidCatch(error, errorInfo) {
		this.setState(state => ({ errors: state.errors.concat(error) }));
		if (window.Sentry) {
			window.Sentry.withScope(scope => {
				scope.setExtras(errorInfo);
				window.Sentry.captureException(error);
			});
		}
	}

	render() {
		if (this.state.errors.length > 0) {
			return this.props.renderErrors({ errors: this.state.errors, fullPage: this.props.fullPage });
		}
		return this.props.children;
	}
}
ErrorBoundary.propTypes = {
	renderErrors: PropTypes.func,
	fullPage: PropTypes.bool,
	children: PropTypes.node,
};
ErrorBoundary.defaultProps = {
	renderErrors: ErrorFeedBack,
};
