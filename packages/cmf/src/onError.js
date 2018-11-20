import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { assertTypeOf } from './assert';
import { handleCSRFToken, getDefaultConfig } from './sagas/http';

/* eslint-disable no-param-reassign */
/**
 * the ref will contains a reference to
 * headers
 * store
 * actions
 * userInfo
 * reportURL
 * error
 * errors
 * subscribe
 */
const ref = {
	callbacks: [],
	errors: [],
	actions: [],
	sensibleKeys: [],
	store: {
		getState: () => {},
	},
};

const DICT = 'abcdefghijklmnopqrst';
const SENSIBLE_REGEXP = /^_|^\$|password|secret|key|mail/;

function random() {
	return DICT[Math.floor((1 + Math.random()) * 25)];
}

function isSensibleKey(key) {
	if (key.toLowerCase().match(SENSIBLE_REGEXP) !== null) {
		return true;
	}
	for (let index = 0; index < ref.sensibleKeys.length; index += 1) {
		if (key.toLowerCase().match(ref.sensibleKeys[index]) !== null) {
			return true;
		}
	}
	return false;
}

/**
 * anon replace value by random if the key is considererd sensitive
 */
function anon(value, key) {
	if (isSensibleKey(key)) {
		const buff = [];
		for (let index = 0; index < value.length; index += 1) {
			buff.push(random());
		}
		return buff.join('');
	}
	return value;
}

/**
 * prepareObject take a JS object and do some process on it
 * - it call toJS on every immutable data
 * - it remove sensitive data
 * @param {Object} originalState object to process
 * @return {Object} friendly with JSON.stringify
 */
function prepareObject(originalState) {
	const state = originalState.toJS ? originalState.toJS() : originalState;
	return Object.keys(state).reduce((acc, key) => {
		const valueType = Array.isArray(acc[key]) ? 'array' : typeof acc[key];
		if (valueType === 'function') {
			acc[key] = `function-${state[key].name}`;
		} else if (valueType === 'array') {
			acc[key] = state[key].map(item => {
				if (typeof item === 'object') {
					return prepareObject(item);
				}
				return anon(item);
			});
		} else if (valueType === 'object') {
			acc[key] = prepareObject(state[key]);
		} else {
			// anonym it
			acc[key] = anon(state[key], key);
		}
		return acc;
	}, {});
}

/**
 * getErrorInfo serialize the error and enrich it
 * so as the dev will have as much information as possible
 */
function getErrorInfo(error) {
	return {
		time: new Date().toISOString(),
		browser: navigator.userAgent,
		location: location.href,
		uiState: prepareObject(ref.store.getState()),
		error: {
			message: error.message,
			name: error.name,
			stack: error.stack,
		},
		actions: ref.actions,
	};
}

function reportError(error) {
	return new Promise((resolve, reject) => reject(error));
}

/**
 * reportResponse function process the `fetch` result and try to
 * extract as most information as possible
 * @param {Object} response Fetch response
 * @return {Promise} with the content of the response
 */
function reportResponse(response) {
	if (response.ok) {
		if (response.json) {
			return response.json();
		}
		return response.text();
	}
	if (response.json) {
		return response.json().then(data => reportError(data));
	}
	return response.text().then(data => reportError(data));
}

/**
 * report function create a report, notify CMF App and try to post it to the backend
 * @param {Error} error instance of Error
 */
function report(error) {
	const info = {
		error,
		reported: false,
		reason: 'Draft',
	};
	ref.error = info;
	ref.errors.push(info);
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
		body: JSON.stringify(getErrorInfo(error)),
	};
	const httpDefault = getDefaultConfig();
	if (httpDefault !== null) {
		options = handleCSRFToken(merge(options, httpDefault));
	}

	if (!ref.serverURL) {
		info.reason = new Error('no serverURL has been set to report Error');
		ref.callbacks.forEach(cb => cb(ref.errors));
	} else {
		ref.callbacks.forEach(cb => cb(ref.errors));
		try {
			fetch(ref.serverURL, options)
				.then(reportResponse, err => {
					info.reported = false;
					info.reason = err;
					ref.callbacks.forEach(cb => cb(ref.errors));
				})
				.then(response => {
					info.reported = true;
					info.response = response;
					ref.callbacks.forEach(cb => cb(ref.errors));
				});
		} catch (err) {
			info.reason = err;
			ref.callbacks.forEach(cb => cb(ref.errors));
		}
	}
}

/**
 * ErrorPanel is a React component responsible to display error
 * to the end user
 */
// class ErrorPanel extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			hidden: true,
// 		};
// 	}

// 	render() {
// 		let currentErrorStatus = 'Waiting for report response';
// 		if (this.props.reported) {
// 			currentErrorStatus = `Has been reported under ${this.props.response.id}`;
// 		} else {
// 			currentErrorStatus = this.props.reason;
// 		}
// 		return (
// 			<div className="panel panel-default">
// 				<div className="panel-heading">Whoops, an error occured</div>
// 				<div className="panel-body">
// 					<p className="text-danger">
// 						{this.props.error.name}: {this.props.error.message}
// 					</p>
// 					<p>Report status: {currentErrorStatus}</p>
// 					<div className="btn-group" style={{ marginTop: 20 }}>
// 						<button className="btn btn-default btn-sm" onClick={reload}>
// 							Refresh
// 						</button>
// 						<button
// 							className="btn btn-default btn-sm"
// 							onClick={() => this.setState({ hidden: !this.state.hidden })}
// 						>
// 							Show error details
// 						</button>
// 					</div>
// 					<pre className={this.state.hidden ? 'hidden' : ''}>{this.props.error.stack}</pre>
// 				</div>
// 			</div>
// 		);
// 	}
// }
// ErrorPanel.propTypes = {
// 	reported: PropTypes.bool,
// 	reason: PropTypes.string,
// 	response: PropTypes.shape({ id: PropTypes.node }),
// 	error: PropTypes.shape({
// 		name: PropTypes.string,
// 		message: PropTypes.string,
// 		stack: PropTypes.string,
// 	}),
// };

// class ErrorFeedBack extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			errors: ref.errors,
// 		};
// 		subscribe(errors => this.setState({ errors }));
// 	}

// 	render() {
// 		return (
// 			<div className="container">
// 				<div className="row">
// 					<div className="col-md-offset-3 col-md-6" style={{ marginTop: 200 }}>
// 						{this.state.errors.map(error => (
// 							<ErrorPanel key={error} {...error} />
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// const errorPropType = PropTypes.shape({
// 	message: PropTypes.string,
// });

// ErrorFeedBack.propTypes = {
// 	error: errorPropType,
// 	// reported: PropTypes.arrayOf(PropTypes.bool),
// };

/**
 * Internal.
 * This function store a callback to call when onError.report is called
 * @param {function} callback a function with only error data structure as argument
 */
function subscribe(callback) {
	ref.callbacks.push(callback);
}

/**
 * addAction store last 20 actions to let onError.report use it.
 */
function addAction(action) {
	if (ref.actions.length > 20) {
		ref.actions.pop();
	}
	try {
		const safeAction = prepareObject(action);
		if (safeAction.type === 'DID_MOUNT_SAGA_START') {
			delete safeAction.props;
		} else if (safeAction.type === 'REACT_CMF.REQUEST_SETTINGS_OK') {
			delete safeAction.settings;
		} else if (safeAction.url === ref.settingsURL) {
			delete safeAction.response;
		}
		ref.actions.push(safeAction);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('onError.actions has not been able to add the following action', action, error);
	}
}

function addSensibleKeyRegexp(r) {
	if (r instanceof RegExp) {
		ref.sensibleKeys.push(r);
	} else {
		throw new Error(`${r} is not a regexp`);
	}
}

/**
 * bootstrap configure onError
 * @param {Object} options to configure
 * @param {Object} store redux
 */
function bootstrap(options, store) {
	assertTypeOf(options, 'onError', 'object');
	ref.store = store;
	const opt = options.onError || {};
	ref.serverURL = opt.reportURL;
	ref.homePath = opt.homePath;
	ref.settingsURL = options.settingsURL;
	if (opt.sensibleKeys) {
		opt.sensibleKeys.forEach(r => addSensibleKeyRegexp(r));
	}
}

/**
 * addOnErrorListener plug window.onerror to onError.report
 */
function addOnErrorListener() {
	window.onerror = (msg, url, lineNo, columnNo, error) => {
		if (error) {
			report(error);
		} else {
			// throw 'something bad happens' / no stack
			report({
				name: 'Error',
				message: msg,
				stack: `url: ${url}, lineNo: ${lineNo}, columnNo: ${columnNo}}`,
			});
		}
	};
}

/**
 * return reference to the array of errors
 */
function getErrors() {
	return ref.errors;
}

export default {
	addOnErrorListener,
	bootstrap,
	addAction,
	report,
	subscribe,
	getErrors,
};
