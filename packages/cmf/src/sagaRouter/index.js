import { all, fork, call } from 'redux-saga/effects';
import { browserHistory as history } from 'react-router';
import routerSaga from './router';
import changeDocumentTitle from './documentTitle';

export default function* initSagaRouter(routes) {
	yield all([fork(routerSaga, history, routes), call(changeDocumentTitle)]);
}
