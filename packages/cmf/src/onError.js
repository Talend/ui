import { assertTypeOf } from './assert';
import CONST from './constant';
import actions from './actions';

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
		getState: () => ({}),
	},
};

const DICT = 'abcdefghijklmnopqrst';
const SENSIBLE_REGEXP = /^_|^\$|password|secret|key|mail/;

function random() {
	return DICT[Math.floor((1 + Math.random()) * 25)];
}

function serialize(error) {
	const std = {
		name: error.name,
		message: error.message,
		fileName: error.fileName,
		lineNumber: error.lineNumber,
		columnNumber: error.columnNumber,
		stack: error.stack,
	};
	// support dynamic properties
	Object.keys(error).reduce((acc, key) => {
		acc[key] = error[key];
		return acc;
	}, std);
	return std;
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
 * getReportInfo serialize the error and enrich it
 * so as the dev will have as much information as possible
 */
function getReportInfo(error) {
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

/**
 * report function create a serilized error and dispatch action.
 * @param {Error} error instance of Error
 */
function report(error) {
	const info = {
		error: serialize(error),
		context: JSON.stringify(getReportInfo(error)),
		reported: false,
		reason: 'Draft',
	};
	ref.error = info;
	ref.errors.push(info);
	if (!ref.serverURL) {
		ref.store.dispatch({
			type: CONST.ERROR,
			...info,
		});
	} else {
		ref.store.dispatch(
			actions.http.post(ref.serverURL, info, {
				onError: err => {
					info.reported = false;
					info.reason = serialize(err);
					return {
						type: CONST.ERROR,
						...info,
					};
				},
				onResponse: response => {
					info.reported = true;
					info.response = response;
					return {
						type: CONST.ERROR,
						...info,
					};
				},
			}),
		);
	}
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
	ref.settingsURL = options.settingsURL;
	if (opt.sensibleKeys) {
		opt.sensibleKeys.forEach(r => addSensibleKeyRegexp(r));
	}
}

/**
 * addOnErrorListener plug window.onerror to onError.report
 */
function addOnErrorListener() {
	window.addEventListener('error', event => {
		const error = event.error;
		if (!error) {
			return;
		}
		// remove duplicate in dev mode
		// SEE: https://github.com/facebook/react/issues/10474
		if (process.env.NODE_ENV !== 'production') {
			if (error.ALREADY_THROWN) {
				return;
			}
			error.ALREADY_THROWN = true;
		}
		report(error);
	});
}

/**
 * return reference to the array of errors
 */
function getErrors() {
	return ref.errors;
}

/**
 * @return {Boolean} true if we can do report to backend
 */
function hasReportURL() {
	return !!ref.serverURL;
}

function middleware() {
	return next => action => {
		try {
			return next(action);
		} catch (err) {
			err.action = action;
			report(err);
			return err;
		}
	};
}

function createObjectURL(error) {
	const data = getReportInfo(error);
	let safeData = data;
	if (typeof data !== 'string') {
		safeData = JSON.stringify(data);
	}
	const MIME_TYPE = 'application/json';
	const blob = new File([safeData], { name: 'report.json', type: MIME_TYPE });
	return window.URL.createObjectURL(blob);
}

export default {
	addOnErrorListener,
	bootstrap,
	addAction,
	hasReportURL,
	getReportInfo,
	report,
	getErrors,
	middleware,
	createObjectURL,
};
