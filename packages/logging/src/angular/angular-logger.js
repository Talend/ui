import angular from 'angular'; // eslint-disable-line import/no-unresolved
import invariant from 'invariant';
import { initErrorTransformer, TraceKit } from '../api/errorTransformer';
import getStatePayloadMiddleware from '../api/payloadMiddleware';

const MODULE_NAME = '@talend/error-logger';

class talendLoggerConfiguration {
	isInitialized = false;

	init({ serverUrl, getState, processState = state => state }) {
		invariant(
			!this.isInitialized,
			'@talend/logging : already initialized. This second initialization may not be what you want.',
		);
		if (this.isInitialized && !serverUrl) {
			invariant(
				false,
				'@talend/logging : you need to initiate server URL in talendLoggerConfiguration',
			);
			return;
		} else if (this.isInitialized && !getState) {
			invariant(
				false,
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
		function loggerProvider($provide) {
			$provide.decorator('$exceptionHandler', [
				'$delegate',
				'talendLoggerConfiguration',
				($delegate, tLoggerConfig) =>
					function talendExceptionHandler(exception, cause) {
						if (!tLoggerConfig.isInitialized) {
							invariant(false, '@talend/logging : error logger is not configured');
						} else {
							TraceKit.report(exception);
						}
						$delegate(exception, cause);
					},
			]);
		},
	]);

export default MODULE_NAME;
