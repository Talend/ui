import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
import { fromJS } from 'immutable';
import get from 'lodash/get';
import Component from './ComponentForm.component';

/**
 * @param {Action{definitionURL: String, uiSpecPath: String, componentId: String }} action
 */
export function* fetchDefinition(action) {
	const { data, response } = yield call(cmf.sagas.http.get, action.definitionURL);
	if (!response.ok) {
		yield put(
			Component.setStateAction(
				prev =>
					prev
						.set('jsonSchema')
						.set('uiSchema')
						.set('response', response)
						.set('dirty', false),
				action.componentId,
			),
		);
	} else if (action.uiSpecPath) {
		const formSpec = get(data, action.uiSpecPath);
		yield put(
			Component.setStateAction(
				{
					definition: data,
					initialState: formSpec,
					...formSpec,
				},
				action.componentId,
			),
		);
	} else {
		yield put(Component.setStateAction({ initialState: data, ...data }, action.componentId));
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

export function* onFormSubmit(componentId, submitURL, action) {
	if (action.componentId !== componentId) {
		return;
	}
	/**
	 * below is a workaround, Component.setStateAction when called with a function as parameter
	 * doesn't produce an object as result but a function.
	 * a function that require as second parameter a function that uppon call return the state
	 */
	const prevState = yield select();
	function getReduxState() {
		return prevState;
	}
	yield put(
		Component.setStateAction(
			prev =>
				prev
					.setIn(['initialState', 'jsonSchema'], prev.get('jsonSchema'))
					.setIn(['initialState', 'uiSchema'], prev.get('uiSchema'))
					.setIn(['initialState', 'properties'], fromJS(action.properties)),
			componentId,
		)(undefined, getReduxState),
	);
	if (!submitURL) {
		return;
	}
	const { response, data } = yield call(cmf.sagas.http.post, submitURL, action.properties);
	yield put({
		type: response.ok ? Component.ON_SUBMIT_SUCCEED : Component.ON_SUBMIT_FAILED,
		data,
		response,
		componentId,
	});
}

/**
 * check that the formId and action type match with the provided actions
 * @param {String} componentId
 * @return {(Action{type: String, componentid: String}) => Bool}
 */
export function checkFormComponentId(componentId, actionType) {
	return function matchActionComponentid(action) {
		return action.type === actionType && action.componentId === componentId;
	};
}

export function* handle(props) {
	yield call(onDidMount, props);
	yield takeEvery(
		checkFormComponentId(props.componentId, Component.ON_DEFINITION_URL_CHANGED),
		fetchDefinition,
	);
	yield takeLatest(Component.ON_SUBMIT, onFormSubmit, props.componentId, props.submitURL);
	yield take('DO_NOT_QUIT');
}

export default {
	'ComponentForm#default': handle,
};
