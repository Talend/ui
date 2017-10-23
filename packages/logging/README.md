# Talend-log - error logging library

A small library that provides redux-logger middleware for error logging to be applied as errorTransformer.

Exports redux-logger compatible error logging middleware.

#### Minimum-config usage:

your configStore.js file:

    import { createStore, applyMiddleware } from 'redux';
    import thunkMiddleware from 'redux-thunk';
    import promise from 'redux-promise-middleware';
    import createLogger from 'redux-logger';
    import LOGGING_SERVER_URL from 'somewhere';
    import initErrorTransformer, { TraceKit } from '@talend/log';

    // important part:
    const logger = createLogger({ errorTransformer: initErrorTransformer(LOGGING_SERVER_URL) });
    // :end of important part

    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promise(), logger)(createStore);
    export default function configureStore(reducer, initialState) {
        const store = createStoreWithMiddleware(reducer, initialState);
        // drop a reference to store instance for later use in errorLogging reportMiddleware
        TraceKit.store = store;
        return store;
    }

#### Advanced config
Look in ./src/errorTransformer.js for jsDoc on each parameter

    import LOGGING_SERVER_URL from 'somewhere';
    import initErrorTransformer from '@talend/log';

    const logger = createLogger({
        errorTransformer: initErrorTransformer(
            LOGGING_SERVER_URL, {
                send: (payload, fetchOptions) => fetch(LOGGING_SERVER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        '@message': payload
                    }),
                    ...fetchOptions,
                }),
                payloadMiddleware: payload => Object.assign({
                    state: TraceKit.store.getState()
                }, payload),
                fetchOptions: {
                    headers: {
                        'Content-Type': 'application/json',
                        custom: 'customData'
                    }
                },
                successHandler: (responseText) => {
                    alert('yay! ' + responseText)
                },
                retryCount: 5,
                retryTimeout: 3000,
                failedTryHandler: function failedTry(error, payload, transportOpts, attempt) {
                    alert('Oh no! ' + error);
                    transportOpts.send(transportOpts.payloadMiddleware(payload), transportOpts.fetchOptions, attempt + 1);
                },
                failedReportHandler: (errorResponse) => {
                    alert('oh no! ' + errorResponse)
                },
            }, {
                stackTraceLimit: 100,
                linesOfContext: 13,
                rethrowErrorHandler: () => {},
                remoteFetching: true,
                collectWindowErrors: true,
            }
        )
    });

Notable details:
 - Once initErrorTransformer is called, listener function is created and registered in TraceKit, then returned.
 - Depending on the parameters you provide, TraceKit.report function may be patched to rethrow no error.
 - transport.send is called with fetchOptions defined on transport.fetchOptions
 - TraceKit.store should be defined in your configStore.js file if you want to attach state to report
 - fetchOptions are merged with Object.assign to default options, so don't expect deepMerge
 - that is also true for default transport and default options objects

#### Log warnings

If you have some non-critical exceptions that should be reported, but should not break application, then use a possibility to provide handler for better microcontrol:

in your config file:

    import LOGGING_SERVER_URL from 'somewhere';
    import initErrorTransformer from '@talend/log';
    import transportConfig from 'somewhere';

    // this:
    initErrorTransformer(LOGGING_SERVER_URL, transportConfig, {
        rethrowErrorHandler: (e) => { if (e.type === 'critical') { throw e; } else { console.error(e); } },
    })

somewhere in your application:

    import { TraceKit } from '@talend/log';

    fetch('google.com').catch(errorResponse => TraceKit.report(new Error(errorResponse)));

### Under the hood

TraceKit - Cross browser stack traces. https://github.com/csnover/TraceKit
