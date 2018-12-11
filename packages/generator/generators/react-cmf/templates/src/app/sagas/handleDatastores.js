import cmf from '@talend/react-cmf';
import { call, put } from 'redux-saga/effects';
import { ERROR_GETTING_DATASTORES } from '../constants';

export default function* handleDatastores() {
	const { response, data } = yield call(cmf.sagas.http.get, '/datastores.json');
	if (!response.ok) {
		yield put({
			type: ERROR_GETTING_DATASTORES,
			data,
		});
	} else {
		yield put(cmf.actions.collections.addOrReplace('datastores', data));
	}
}
