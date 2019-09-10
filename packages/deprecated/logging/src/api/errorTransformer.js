/**
 * The purpose of this file is to provide redux-logger middleware for error logging
 * To be applied as errorTransformer, or even actionTransformer
 * @exports redux-logger compatible error logging middleware
 * @export TraceKit, to avoid adding dependency to customer's code
 **/

import TraceKit_ from 'tracekit';
import 'whatwg-fetch';

import { sendReport, getDefaultTransport } from './transport';

const defaultOptions = {
	stackTraceLimit: Error.stackTraceLimit,
	linesOfContext: 15,
};

/**
 * @param rethrowErrorHandler - handler for rethrown errors
 * @returns Report, wrapped TraceKit.report method which no longer rethrows an error
**/
function safeWrapReport(rethrowErrorHandler) {
	function report(ex) {
		try {
			TraceKit_.fallback(ex);
		} catch (e) {
			rethrowErrorHandler(ex);
		}
	}
	report.subscribe = TraceKit_.report.subscribe;
	report.unsubscribe = TraceKit_.report.unsubscribe;
	TraceKit_.fallback = TraceKit_.report;
	return report;
}

/**
 * @param logServerUrl - string, fetch-compatible logger instance URL
 * @param transport - object, {
 *   send: function that accepts (payload, fetchOptions) and returns Promise, {
 *     payload: string or json object, report
 *     fetchOptions: object, options that transport.send accepts { headers, method, etc }
 *   }
 *   successHandler: function to be called on successful report,
 *                   takes response text, return is ignored,
 *   failedTryHandler: function to be called on transport.send error,
 *                     takes {
 *                       error: Error object thrown inside of transfer.send,
 *                       payload: string or json object, report before middleware was applied,
 *                       transportOpts: reference to the transport object,
 *                       attempt: # of try to send report,
 *                     }, return is ignored, by default tries to repeat request,
 *   failedReportHandler: function to be called on report general failure,
 *                        takes Error object, return is ignored,
 *   payloadMiddleware: function to be applied on payload, to attach store state, time, etc,
 *   retryCount: number # of max retries, by-default 2, set to 0 if you don't want retries
 *   retryTimeout: number in ms, by-default 60 seconds,
 * }
 * @param options - object {
 *   stackTraceLimit: number, max call stack size, applied globally on Error object,
 *   linesOfContext: number, should be odd and >=3, by-default 15,
 *   rethrowError: boolean, tells to either monkey-patch TraceKit.report method or no, false by-def,
 *   otherTraceKitOptions can be any options that TraceKit understands
 * }
 * @returns function, redux-logger compatible middleware for messages
 **/
export function initErrorTransformer(logServerUrl, transport = {}, options = {}) {
	const {
		stackTraceLimit,
		rethrowErrorHandler,
		linesOfContext,
		...otherTraceKitOptions
	} = Object.assign(defaultOptions, options);

	const mergedTransport = Object.assign(getDefaultTransport(logServerUrl), transport);

	Error.stackTraceLimit = stackTraceLimit;
	Object.assign(TraceKit_, {
		fetchContext: !!linesOfContext,
		linesOfContext,
		...otherTraceKitOptions,
	});

	if (rethrowErrorHandler) {
		TraceKit_.report = safeWrapReport(rethrowErrorHandler);
	}

	function listener(payload) {
		return sendReport(payload, mergedTransport);
	}

	TraceKit_.report.subscribe(listener);

	return listener;
}

export const TraceKit = TraceKit_;
