import { all, fork } from 'redux-saga/effects';
import { browserHistory as history } from 'react-router';
import routerSaga from './router';

export default function* initSagaRouter(routes) {
	yield all([fork(routerSaga, history, routes)]);
}
