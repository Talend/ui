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
		}
		// anonym it
		acc[key] = anon(state[key], key);
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
	ref.callbacks.forEach(cb => cb(error));
	ref.error = error;
	ref.errors.push(error);
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
			return fetch(ref.serverURL, options).then(reportResponse, reportError);
		} catch (err) {
			return reportError(err);
		}
	}
	return reportError(new Error('no serverURL has been set to report Error'));
}

function getInfo(props, error) {
	const searchFor = error || props.error;
	return props.errors.find(info => info.error === searchFor);
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
		if (this.props.info) {
			if (this.props.info.reported) {
				currentErrorStatus = `Has been reported under ${this.props.info.response.id}`;
			} else {
				currentErrorStatus = this.props.info.reason;
			}
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
	info: PropTypes.shape({
		reported: PropTypes.bool,
		reason: PropTypes.string,
		response: PropTypes.shape({ id: PropTypes.string }),
	}),
	error: {
		name: PropTypes.string,
		message: PropTypes.string,
		stack: PropTypes.string,
	},
};

function ErrorFeedBack(props) {
	const info = getInfo(props);
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-offset-3 col-md-4">
					<ErrorPanel error={props.error} info={info} />
					{props.errors.length > 1 && (
						<div>
							<h2>Other errors</h2>
							<ul>
								{props.errors.map(error => (
									<ErrorPanel key={error.error} error={error.error} info={error} />
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
	errors: PropTypes.arrayOf(errorPropType),
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

export default {
	report,
	subscribe,
	ErrorFeedBack,
	setReportURL,
	setStore,
};
