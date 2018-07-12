import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
import get from 'lodash/get';
import Component from './ComponentForm.component';

export function* fetchDefinition({ definitionURL, componentId, uiSpecPath }) {
	const { data, response } = yield call(cmf.sagas.http.get, definitionURL);
	if (!response.ok) {
		yield put(
			Component.setStateAction(
				prev =>
					prev
						.set('jsonSchema')
						.set('uiSchema')
						.set('response', response)
						.set('dirty', false),
				componentId,
			),
		);
	} else if (uiSpecPath) {
		yield put(
			Component.setStateAction(
				{
					definition: data,
					...get(data, uiSpecPath),
				},
				componentId,
			),
		);
	} else {
		yield put(Component.setStateAction(data, componentId));
	}
}

export function* onDidMount({ componentId = 'default', definitionURL, uiSpecPath }) {
	const jsonSchema = yield select(state =>
		Component.getState(state, componentId).get('jsonSchema'),
	);
	if (!jsonSchema) {
		yield fetchDefinition({ definitionURL, componentId, uiSpecPath });
	}
}

export function* handle(props) {
	yield call(onDidMount, props);
	yield takeEvery(Component.ON_DEFINITION_URL_CHANGED, fetchDefinition);
	yield take('DO_NOT_QUIT');
}

export default {
	'ComponentForm#default': handle,
};
