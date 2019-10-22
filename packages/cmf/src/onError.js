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

/**
 * getReportInfo serialize the error and enrich it
 * so as the dev will have as much information as possible
 */
function getReportInfo(error) {
	return {
		time: new Date().toISOString(),
		browser: navigator.userAgent,
		location: location.href,
		error: serialize(error),
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
			actions.http.post(ref.serverURL, info.context, {
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
	if (ref.actions.length >= 200) {
		ref.actions.shift();
	}
	ref.actions.push(action && action.type ? action.type : 'UNKNOWN');
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
