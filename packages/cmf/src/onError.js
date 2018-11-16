import React from 'react';
import PropTypes from 'prop-types';

/**
 * the ref will contains a reference to
 * headers
 * store
 * lastActions
 * userInfo
 * reportURL
 * error
 * errors
 * subscribe
 */
const ref = {
	callbacks: [],
	errors: [],
};

const DICT = 'abcdefghijklmnopqrst';

function random() {
	return DICT[Math.floor((1 + Math.random()) * 25)];
}

function anon(value, key) {
	if (key === 'id') {
		return value;
	}
	if (typeof value === 'string') {
		const buff = [];
		for (let index = 0; index < value.length; index += 1) {
			buff.push(random());
		}
		return buff.join('');
	}
	return value;
}

function serialiseReduxState(originalState) {
	const state = originalState.toJS ? originalState.toJS() : originalState;
	return Object.keys(originalState).reduce((acc, key) => {
		const valueType = Array.isArray(acc[key]) ? 'array' : typeof acc[key];
		if (valueType === 'array') {
			acc[key] = state[key].map(item => {
				if (typeof item === 'object') {
					return serialiseReduxState(item);
				}
				return anon(item);
			});
		} else if (valueType === 'object') {
			acc[key] = serialiseReduxState(state[key]);
		} else {
			// anonym it
			acc[key] = anon(state[key], key);
		}
		return acc;
	}, {});
}

function getErrorInfo(error) {
	return {
		time: new Date().toISOString(),
		browser: navigator.userAgent,
		userInfo: ref.userId,
		error: {
			message: error.message,
			name: error.name,
			stack: error.stack,
		},
		lastActions: ref.lastActions,
		uiState: serialiseReduxState(ref.store.getState()),
	};
}

function reportError(error) {
	return new Promise((resolve, reject) => reject(error));
}

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
 * This function report error at the App level in every place this is needed.
 * @param {Error} error instance of Error
 */
function report(error) {
	const info = {
		error,
		reported: false,
		reason: 'On going',
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
			fetch(ref.serverURL, options).then(reportResponse, err => {
				info.reported = false;
				info.reason = err;
				ref.callbacks.forEach(cb => cb(info));
			}).then(response => {
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

function reload() {
	location.reload(true);
}

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
						<button
							className="btn btn-default btn-sm"
							onClick={reload}
						>
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
	response: PropTypes.shape({ id: PropTypes.string }),
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

function setReportURL(serverURL) {
	ref.serverURL = serverURL;
}

function setStore(store) {
	ref.store = store;
}
function subscribe(callback) {
	ref.callbacks.push(callback);
}

function getError() {
	return ref.error;
}

function getErrors() {
	return ref.error;
}

export default {
	report,
	subscribe,
	getError,
	getErrors,
	ErrorFeedBack,
	setReportURL,
	setStore,
};
