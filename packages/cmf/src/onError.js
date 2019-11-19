import get from 'lodash/get';
import { captureException, withScope, init } from '@sentry/browser';
import { assertTypeOf } from './assert';
import CONST from './constant';
import actions from './actions';

/* eslint-disable no-param-reassign */
/**
 * the ref will contains a reference to
 * store
 * actions
 * reportURL
 * error
 * errors
 */
const ref = {
	errors: [],
	actions: [],
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
 * @return {Boolean} true if we can do report to backend using reportURL configuration
 */
function hasReportURL() {
	return !!ref.serverURL;
}

/**
 * @return {Boolean} true if we can do report to Sentry
 */
function hasReportFeature() {
	return !!ref.SENTRY_DSN || hasReportURL();
}

/**
 * report function create a serilized error and dispatch action.
 * @param {Error} error instance of Error
 */
function report(error, options = {}) {
	if (ref.SENTRY_DSN) {
		if (options.tags) {
			withScope(scope => {
				options.tags.forEach(tag => scope.setTag(tag.key, tag.value));
				captureException(error);
			});
		} else {
			captureException(error);
		}
	} else {
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
}

function onJSError(event) {
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
}

/**
 * init Sentry lib
 * @return {[type]} [description]
 */
function setupSentry() {
	if (!ref.SENTRY_DSN) {
		return;
	}
	window.removeEventListener('error', onJSError);
	try {
		init({ dsn: ref.SENTRY_DSN });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		delete ref.SENTRY_DSN;
		window.addEventListener('error', onJSError);
	}
}

/**
 * bootstrap configure onError
 * @param {Object} options to configure
 * @param {Object} store redux
 */
function bootstrap(options, store) {
	window.addEventListener('error', onJSError);
	assertTypeOf(options, 'onError', 'object');
	ref.SENTRY_DSN = undefined;
	ref.actions = [];
	ref.errors = [];
	ref.store = store;
	const opt = options.onError || {};
	ref.serverURL = opt.reportURL;
	if (opt.SENTRY_DSN) {
		ref.SENTRY_DSN = opt.SENTRY_DSN;
		setupSentry();
	}
}

/**
 * return reference to the array of errors
 */
function getErrors() {
	return ref.errors;
}

function setupFromSettings(settings) {
	const dsn = get(settings, 'env.SENTRY_DSN');
	if (!ref.SENTRY_DSN && ref.SENTRY_DSN !== dsn) {
		ref.SENTRY_DSN = dsn;
		setupSentry();
	}
}

/**
 * onError redux middleware.
 * it store last 20 actions
 * it catch settings fetch OK to try to setup Sentry
 * it try catch every sub actions effect to report error
 */
function middleware() {
	return next => action => {
		if (!ref.SENTRY_DSN) {
			if (ref.actions.length >= 20) {
				ref.actions.shift();
			}
			ref.actions.push(get(action, 'type', 'UNKNOWN'));
		}
		if (action.type === CONST.REQUEST_OK) {
			setupFromSettings(action.settings);
		}
		try {
			return next(action);
		} catch (error) {
			report(error, { tags: [{ key: 'redux-action-type', value: get(action, 'type', 'UNKNOWN') }] });
			// eslint-disable-next-line no-console
			console.error(error);
			return undefined;
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
	hasReportURL,
	hasReportFeature,
	getReportInfo,
	report,
	getErrors,
	middleware,
	createObjectURL,
	revokeObjectURL,
};
