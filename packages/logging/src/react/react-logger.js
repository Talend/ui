import { Component } from 'react';
import PropTypes from 'prop-types';
import { initErrorTransformer, TraceKit } from '../api/errorTransformer';
import getStatePayloadMiddleware from '../api/payloadMiddleware';

export default class ErrorReporter extends Component {
	constructor(props) {
		super(props);
		initErrorTransformer(props.serverUrl, {
			payloadMiddleware: getStatePayloadMiddleware(() => props.processState(props.getState())),
		});
	}

	// eslint-disable-next-line class-methods-use-this
	componentDidCatch(error) {
		TraceKit.report(error);
	}

	render() {
		return this.props.children;
	}
}
ErrorReporter.propTypes = {
	getState: PropTypes.func,
	serverUrl: PropTypes.string,
	processState: PropTypes.func,
	children: PropTypes.node,
};
