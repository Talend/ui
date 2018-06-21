import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
import Component from './ComponentForm.component';

function* fecthDefinition({ definitionURL, componentId }) {
	const { data, response } = yield call(cmf.sagas.http.get, definitionURL);
	if (!response.ok) {
		yield put(
			Component.setStateAction(prev => {
				let newState = prev.set('jsonSchema', undefined);
				newState = prev.set('uiSchema', undefined);
				newState.set({ response });
				return newState;
			}, componentId),
		);
	} else {
		yield put(Component.setStateAction(data, componentId));
	}
}

function* onDidMount({ componentId = 'default', definitionURL }) {
	const state = yield select();
	if (!Component.getState(state, componentId).get('jsonSchema')) {
		yield fecthDefinition({ definitionURL, componentId });
	}
}

function* handle(props) {
	yield call(onDidMount, props);
	yield takeEvery(Component.ON_DEFINITION_URL_CHANGED, fecthDefinition);
	yield take('DO_NOT_QUIT');
}

function* syncPropertiesInStore() {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const action = yield take(Component.ON_CHANGE);
		yield put(Component.setStateAction({ properties: action }, action.event.props.componentId));
	}
}

export default {
	'ComponentForm#default': handle,
	'ComponentForm#syncPropertiesInStore': syncPropertiesInStore,
};
