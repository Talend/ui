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

const DICT = 'abcdefghijklmnopqrstuvwxyz0123456789';
const SENSIBLE_REGEXP = /^_|^\$|password|secret|key|mail/;

function random() {
	return DICT[Math.floor(Math.random() * DICT.length)];
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
 * anon() replaces value by a random string if the key is considered sensitive
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
	const state = originalState && originalState.toJS ? originalState.toJS() : originalState;

	if (state === undefined || state === null) {
		return '';
	}

	return Object.keys(state).reduce((acc, key) => {
		const valueType = Array.isArray(acc[key]) ? 'array' : typeof state[key];
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
						type: CONST.ERROR_REPORTED,
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
	if (ref.actions.length >= 20) {
		ref.actions.shift();
	}
	try {
		let safeAction = { ...action };
		if (safeAction.type === 'DID_MOUNT_SAGA_START') {
			delete safeAction.props;
		} else if (safeAction.type === 'REACT_CMF.REQUEST_SETTINGS_OK') {
			delete safeAction.settings;
		} else if (safeAction.url === ref.settingsURL) {
			delete safeAction.response;
		}
		safeAction = prepareObject(safeAction);
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
	ref.actions = [];
	ref.callbacks = [];
	ref.errors = [];
	ref.sensibleKeys = [];
	ref.store = store;
	const opt = options.onError || {};
	ref.serverURL = opt.reportURL;
	ref.settingsURL = options.settingsURL;
	if (opt.sensibleKeys) {
		opt.sensibleKeys.forEach(r => addSensibleKeyRegexp(r));
	}
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

/**
 * simple try catch middleware for redux
 */
function middleware() {
	return next => action => {
		try {
			return next(action);
		} catch (err) {
			err.action = action;
			report(err);
			throw err;
		}
	};
}

function createObjectURL(error) {
	const data = getReportInfo(error);
	const strData = JSON.stringify(data);
	const MIME_TYPE = 'application/json';
	// For IE11, you can use the Blob class to construct a File object.
	// This seems to be the most portable solution.
	const blob = new Blob([strData], { type: MIME_TYPE });
	blob.name = 'report.json';
	return window.URL.createObjectURL(blob);
}

function revokeObjectURL(url) {
	window.URL.revokeObjectURL(url);
}

export default {
	bootstrap,
	addAction,
	hasReportURL,
	getReportInfo,
	report,
	getErrors,
	middleware,
	createObjectURL,
	revokeObjectURL,
};
