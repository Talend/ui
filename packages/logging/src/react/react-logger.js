import ReactUpdates from 'react-dom/lib/ReactUpdates';
import ReactDefaultBatchingStrategy from 'react-dom/lib/ReactDefaultBatchingStrategy';
import { initErrorTransformer, TraceKit } from '../api/errorTransformer';
import getStatePayloadMiddleware from '../api/payloadMiddleware';

function injectLogger() {
	let isHandlingError = false;
	const ReactTryCatchBatchingStrategy = {
		// this is part of the BatchingStrategy API. simply pass along
		// what the default batching strategy would do.
		get isBatchingUpdates() {
			return ReactDefaultBatchingStrategy.isBatchingUpdates;
		},

		batchedUpdates(...args) {
			try {
				ReactDefaultBatchingStrategy.batchedUpdates(...args);
			} catch (e) {
				if (isHandlingError) {
					// our error handling code threw an error. just throw now
					throw e;
				}

				isHandlingError = true;
				try {
					TraceKit.report(e);
				} finally {
					isHandlingError = false;
				}
			}
		},
	};

	ReactUpdates.injection.injectBatchingStrategy(ReactTryCatchBatchingStrategy);
}

export default function initReactLogger({ serverUrl, getState, processState = state => state }) {
	initErrorTransformer(serverUrl, {
		payloadMiddleware: getStatePayloadMiddleware(() => processState(getState())),
	});
	injectLogger();
}
