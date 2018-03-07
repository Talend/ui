/**
 * This module defines console which is just a browser console wrapper
 * @module react-cmf/lib/console
 * @see module:react-cmf/lib/api
 */

/**
 * Simple prefix for any log content
 * @type {string}
 */
export const LOGGER_PREFIX = '[react-cmf]';

/**
 * Supported console method list
 * @type {string[]}
 */
export const LOGGER_METHODS = [
	'trace',
	'debug',
	'log',
	'info',
	'warn',
	'error',
];

/**
 * White list for authorized console methods for production mode
 * @type {string[]} Authorized console methods
 */
export const LOGGER_METHODS_FOR_PRODUCTION = [
	'warn',
	'error',
];

/**
 * Service that wraps console.log (no output in production mode)
 * @type {{}}
 */
const logger = {
	prefix: LOGGER_PREFIX,
	setPrefix(prefix) {
		this.prefix = prefix;
	},
	getPrefix() {
		return this.prefix;
	}
};

/**
 * First, be sure that window.console exists
 */
const windowConsole = (typeof window !== 'undefined') ? window.console : [];

// Populate service with some recognized console functions
LOGGER_METHODS.forEach(method => {
	logger[method] = (...args) => {
		if (process.env.NODE_ENV !== 'production' || LOGGER_METHODS_FOR_PRODUCTION.includes(method)) {
			const windowConsoleMethod = windowConsole[method] || windowConsole.log;
			if (windowConsoleMethod) {
				const consoleArgs = Array.prototype.slice.call(args);
				consoleArgs.unshift(logger.getPrefix());
				windowConsoleMethod.apply(windowConsole, consoleArgs);
			}
		}
		return Function.prototype;
	}
});

export default logger;
