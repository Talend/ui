import React from 'react';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import UIRouter from './UIRouter';

function getHistory() {
	return hashHistory;
}

function getReduxMiddleware(history) {
	return routerMiddleware(history);
}

function insertReducer(enableBatching, preApplyReducer, combineReducers, rootReducer) {
	const reducers = {
		...rootReducer,
		routing: routerReducer,
	};
	return enableBatching(preApplyReducer(combineReducers(reducers)));
}

function getStoreHistory(history, store) {
	return syncHistoryWithStore(history, store);
}

function getProvider(history) {
	return <UIRouter history={history} />;
}

export default {
	getHistory,
	getProvider,
	getReduxMiddleware,
	insertReducer,
	getStoreHistory,
};
