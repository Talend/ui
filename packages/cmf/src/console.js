/**
 * This module define console which is just console wrapper
 * used to be called in the way you want in your APP with a context and a payload as params
 * @module react-cmf/lib/console
 * @see module:react-cmf/lib/api
 */

/**
 * Service for wrrapping console.log with no output in production mode
 * @type {{}}
 */
const logger = {};

const windowConsole = (typeof window !== 'undefined') ? window.console : [];

const productionLogLevels = [
	'warn',
	'error',
];

[
	'trace',
	'debug',
	'log',
	'info',
	'warn',
	'error',
].forEach(level => {
	logger[level] = Function.prototype;
	if (process.env.NODE_ENV !== 'production' || productionLogLevels.includes(level)) {
		logger[level] = windowConsole[level] || windowConsole['log'] || Function.prototype;
	}
});

export default logger;
