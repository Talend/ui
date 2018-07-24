import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
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

function* onFormSubmit(componentId, submitURL, action) {
	if (action.componentId !== componentId || !submitURL) {
		return;
	}
	const { response, data } = yield call(cmf.sagas.http.post, submitURL, action.properties);
	if (!response.ok) {
		return;
	}
	yield put({
		type: Component.ON_SUBMIT_SUCCEED,
		data,
		componentId,
	});
}

export function* handle(props) {
	yield call(onDidMount, props);
	yield takeEvery(Component.ON_DEFINITION_URL_CHANGED, fetchDefinition);
	yield takeLatest(Component.ON_SUBMIT, onFormSubmit, props.componentId, props.submitURL);
	yield take('DO_NOT_QUIT');
}

export default {
	'ComponentForm#default': handle,
};
