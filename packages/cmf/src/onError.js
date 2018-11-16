import React from 'react';
import PropTypes from 'prop-types';
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
};

const DICT = 'abcdefghijklmnopqrst';
const SENSIBLE_REGEXP = /^_|^\$|password|secret|key|mail/;

function random() {
	return DICT[Math.floor((1 + Math.random()) * 25)];
}

function isSensibleKey(key) {
	if (key.match(SENSIBLE_REGEXP) !== null) {
		return true;
	}
	return ref.sensibleKeys.contains(key);
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
	return Object.keys(originalState).reduce((acc, key) => {
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
	ref.callbacks.forEach(cb => cb(info));
	// ref.errors.push(error);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			credentials: 'same-origin',
		},
		body: JSON.stringify(getErrorInfo(error)),
	};
	if (ref.serverURL) {
		try {
			fetch(ref.serverURL, options)
				.then(reportResponse, err => {
					info.reported = false;
					info.reason = err;
					ref.callbacks.forEach(cb => cb(info));
				})
				.then(response => {
					info.reported = true;
					info.response = response;
					ref.callbacks.forEach(cb => cb(info));
				});
		} catch (err) {
			info.reason = err;
			ref.callbacks.forEach(cb => cb(info));
		}
	} else {
		info.reason = new Error('no serverURL has been set to report Error');
		ref.callbacks.forEach(cb => cb(info));
	}
}

/**
 * reload is an event handler. It will reload the current page
 */
function reload() {
	location.reload(true);
}

/**
 * ErrorPanel is a React component responsible to display error
 * to the end user
 */
class ErrorPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: true,
		};
	}

	render() {
		let currentErrorStatus = 'Waiting for report response';
		if (this.props.reported) {
			currentErrorStatus = `Has been reported under ${this.props.response.id}`;
		} else {
			currentErrorStatus = this.props.reason;
		}
		return (
			<div className="panel panel-default" style={{ marginTop: 200 }}>
				<div className="panel-heading">Whoops, an error occured</div>
				<div className="panel-body">
					<p className="text-danger">
						{this.props.error.name}: {this.props.error.message}
					</p>
					<p>Report status: {currentErrorStatus}</p>
					<div className="btn-group" style={{ marginTop: 20 }}>
						<button className="btn btn-default btn-sm" onClick={reload}>
							Refresh
						</button>
						<button
							className="btn btn-default btn-sm"
							onClick={() => this.setState({ hidden: !this.state.hidden })}
						>
							Show error details
						</button>
					</div>
					<pre className={this.state.hidden ? 'hidden' : ''}>{this.props.error.stack}</pre>
				</div>
			</div>
		);
	}
}
ErrorPanel.propTypes = {
	reported: PropTypes.bool,
	reason: PropTypes.string,
	response: PropTypes.shape({ id: PropTypes.node }),
	error: PropTypes.shape({
		name: PropTypes.string,
		message: PropTypes.string,
		stack: PropTypes.string,
	}),
};

function ErrorFeedBack(props) {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-offset-3 col-md-4">
					<ErrorPanel {...props.error} />
					{ref.errors.length > 1 && (
						<div>
							<h2>Other errors</h2>
							<ul>
								{ref.errors.slice(1).map(error => (
									<ErrorPanel key={error} {...error} />
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const errorPropType = PropTypes.shape({
	message: PropTypes.string,
});

ErrorFeedBack.propTypes = {
	error: errorPropType,
	// reported: PropTypes.arrayOf(PropTypes.bool),
};

/**
 * This function store the serverURL so onError report can use it
 * @param {string} serverURL the URL to POST errors
 */
function setReportURL(serverURL) {
	ref.serverURL = serverURL;
}

/**
 * This function store the redux store so onError report can use it
 * @param {Object} store the redux store
 */
function setStore(store) {
	ref.store = store;
}

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
		ref.actions.push(prepareObject(action));
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('onError.actions has not been able to add the following action', action, error);
	}
}

export default {
	addAction,
	report,
	subscribe,
	ErrorFeedBack,
	setReportURL,
	setStore,
};
