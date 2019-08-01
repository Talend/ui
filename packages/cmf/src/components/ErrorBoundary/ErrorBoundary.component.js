import React from 'react';
import PropTypes from 'prop-types';
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
		if (this.state.errors.length > 0) {
			const renderErrors = this.props.renderErrors;
			return renderErrors({ errors: this.state.errors, full: this.props.full });
		}
		return this.props.children;
	}
}
ErrorBoundary.propTypes = {
	renderErrors: PropTypes.func,
};
ErrorBoundary.defaultProps = {
	renderErrors: ErrorFeedBack,
};
