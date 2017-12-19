import angular from 'angular';
import { initErrorTransformer, TraceKit } from '../api/errorTransformer';
import getStatePayloadMiddleware from '../api/payloadMiddleware';

const MODULE_NAME = '@talend/error-logger';

class talendLoggerConfiguration {
	serverUrl = '';
	getState = () => {};

	setServerUrl(userServerUrl) {
		this.serverUrl = userServerUrl;
	}

	setGetState(userGetState) {
		this.getState = userGetState;
	}

	init() {
		if (!this.serverUrl) {
			console.error('@talend/logging : you need to initiate server URL in talendLogger provider');
		}
		initErrorTransformer(
			this.serverUrl,
			{ payloadMiddleware: getStatePayloadMiddleware(this.getState) }
		);
	}
}

angular
	.module(MODULE_NAME, [])
	.service('talendLoggerConfiguration', talendLoggerConfiguration)
	.factory('$exceptionHandler', ['$log', 'talendLoggerConfiguration', ($log, tLoggerConfig) => {
		return function talendExceptionHandler(exception, cause) {
			TraceKit.report(exception);
			$log.error(exception, cause);
		};
	}]);

export default MODULE_NAME;
