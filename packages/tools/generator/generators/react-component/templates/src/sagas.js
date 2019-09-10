// import cmf from 'react-cmf';
// import { takeEvery, call, put } from 'redux-saga/effects';

// function* onEvent(action) {
// 	const { response, data} = yield call(cmf.sagas.http.get, action.url);
// 	if (response.ok) {
// 		yield put(cmf.actions.collection.addOrReplace(action.collection, data));
// 	}
// }

// function* main() {
// 	yield takeEvery(, onEvent);
// }

export default {
	// key is the registry key, by convention use the componentName in it
	// '<%= props.name %>#default': main
};
