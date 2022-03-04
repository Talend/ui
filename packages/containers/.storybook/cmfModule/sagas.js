import { actions, sagas } from '@talend/react-cmf';
import { call, put } from 'redux-saga/effects';

function* sagaPhotoGet3() {
	const answer = yield call(sagas.http.get, 'https://jsonplaceholder.typicode.com/photos/');
	yield put(actions.collections.addOrReplace('photos3', answer.data));
}

export default { 'saga:get:photos3': sagaPhotoGet3 };
