import get from 'lodash/get';
import { captureException, withScope, init } from '@sentry/browser';
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
	actions: [],
	errors: [],
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
	if (hasReportFeature()) {
		captureException(error);
	} else {
		const info = {
		       error: serialize(error),
		       context: JSON.stringify(getReportInfo(error)),
		       reported: false,
		       reason: 'Draft',
		};
		ref.error = info;
		ref.errors.push(info);
	    ref.store.dispatch({
           type: CONST.ERROR,
           ...info,
    	});
	}
}

/**
 * init Sentry lib
 * @return {[type]} [description]
 */
function setupSentry() {
	if (!ref.SENTRY_DSN) {
		return;
	}
	try {
		init({ dsn: ref.SENTRY_DSN });
	} catch (error) {
		console.error(error);
		delete ref.SENTRY_DSN;
	}
}

/**
 * bootstrap configure onError
 * @param {Object} options to configure
 * @param {Object} store redux
 */
function bootstrap(options, store) {
	assertTypeOf(options, 'onError', 'object');
	ref.errors = [];
	ref.actions = [];
	const opt = options.onError || {};
	ref.SENTRY_DSN = opt.SENTRY_DSN;
	setupSentry();
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
function hasReportFeature() {
	return !!ref.SENTRY_DSN;
}

function setupFromSettings(settings) {
	const dsn = get(settings, 'env.SENTRY_DSN');
	if (ref.SENTRY_DSN !== dsn && !ref.SENTRY_DSN) {
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
		if (!hasReportFeature() && ref.actions.length >= 20) {
			ref.actions.shift();
			ref.actions.push(action && action.type ? action.type : 'UNKNOWN');
		}
		if (action.type === CONSTANTS.REQUEST_OK) {
			setupFromSettings(action.settings);
		}
		try {
			return next(action);
		} catch (error) {
			withScope(function(scope) {
			  scope.setTag("redux-action-type", action.type);
			  captureException(error);
			});
			console.error(error);
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
	hasReportFeature,
	getReportInfo,
	report,
	middleware,
	createObjectURL,
	revokeObjectURL,
};
