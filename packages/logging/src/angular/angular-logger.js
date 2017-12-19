import angular from 'angular';
import { initErrorTransformer, TraceKit } from '../api/errorTransformer';
import getStatePayloadMiddleware from '../api/payloadMiddleware';

const MODULE_NAME = '@talend/error-logger';

function defaultProcessState(state) {
	return state;
}

class talendLoggerConfiguration {
	isInitialized = false;

	init({ serverUrl, getState, processState = defaultProcessState }) {
		if (!serverUrl) {
			console.error('@talend/logging : you need to initiate server URL in talendLoggerConfiguration');
			return;
		} else if (!getState) {
			console.error('@talend/logging : you need to initiate the state provider in talendLoggerConfiguration');
			return;
		}

		initErrorTransformer(
			serverUrl,
			{ payloadMiddleware: getStatePayloadMiddleware(() => processState(getState())) }
		);
		this.isInitialized = true;
	}
}

angular
	.module(MODULE_NAME, [])
	.service('talendLoggerConfiguration', talendLoggerConfiguration)
	.factory('$exceptionHandler', ['$log', 'talendLoggerConfiguration', ($log, tLoggerConfig) => {
		return function talendExceptionHandler(exception, cause) {
			if (!tLoggerConfig.isInitialized) {
				console.error('@talend/logging : error logger is not configured');
			} else {
				TraceKit.report(exception);
			}
			$log.error(exception, cause);
		};
	}]);

export default MODULE_NAME;
