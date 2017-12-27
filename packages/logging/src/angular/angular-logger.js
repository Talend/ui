import angular from 'angular';
import { initErrorTransformer, TraceKit } from '../api/errorTransformer';
import getStatePayloadMiddleware from '../api/payloadMiddleware';

const MODULE_NAME = '@talend/error-logger';

class talendLoggerConfiguration {
	isInitialized = false;

	init({ serverUrl, getState, processState = state => state }) {
		if (this.isInitialized) {
			console.error(
				'@talend/logging : already initialized. This second initialization may not be what you want.',
			);
		} else if (!serverUrl) {
			console.error(
				'@talend/logging : you need to initiate server URL in talendLoggerConfiguration',
			);
			return;
		} else if (!getState) {
			console.error(
				'@talend/logging : you need to initiate the state provider in talendLoggerConfiguration',
			);
			return;
		}

		initErrorTransformer(serverUrl, {
			payloadMiddleware: getStatePayloadMiddleware(() => processState(getState())),
		});
		this.isInitialized = true;
	}
}

angular
	.module(MODULE_NAME, [])
	.service('talendLoggerConfiguration', talendLoggerConfiguration)
	.config([
		'$provide',
		function($provide) {
			$provide.decorator('$exceptionHandler', [
				'$delegate',
				'talendLoggerConfiguration',
				($delegate, tLoggerConfig) =>
					function talendExceptionHandler(exception, cause) {
						if (!tLoggerConfig.isInitialized) {
							console.error('@talend/logging : error logger is not configured');
						} else {
							TraceKit.report(exception);
						}
						$delegate(exception, cause);
					},
			]);
		},
	]);

export default MODULE_NAME;
