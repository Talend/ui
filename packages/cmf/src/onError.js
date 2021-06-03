import get from 'lodash/get';
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
	return window.Sentry || hasReportURL();
}

/**
 * report function create a serilized error and dispatch action.
 * @param {Error} error instance of Error
 */
function report(error, options = {}) {
	if (window.Sentry) {
		if (options.tags) {
			window.Sentry.withScope(scope => {
				options.tags.forEach(tag => scope.setTag(tag.key, tag.value));
				window.Sentry.captureException(error);
			});
		} else {
			window.Sentry.captureException(error);
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

/**
 * bootstrap configure onError
 */
function bootstrap() {
}

/**
 * return reference to the array of errors
 */
function getErrors() {
	return ref.errors;
}

function setupFromSettings() {
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
			report(error, {
				tags: [{ key: 'redux-action-type', value: get(action, 'type', 'UNKNOWN') }],
			});
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
