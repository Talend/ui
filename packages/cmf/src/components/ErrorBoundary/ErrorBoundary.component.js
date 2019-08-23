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
			return this.props.renderErrors({ errors: this.state.errors, full: this.props.full });
		}
		return this.props.children;
	}
}
ErrorBoundary.propTypes = {
	renderErrors: PropTypes.func,
	full: PropTypes.bool,
	children: PropTypes.node,
};
ErrorBoundary.defaultProps = {
	renderErrors: ErrorFeedBack,
};
