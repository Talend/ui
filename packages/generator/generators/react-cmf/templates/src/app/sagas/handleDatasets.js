import cmf from '@talend/react-cmf';
import { call, put } from 'redux-saga/effects';
import { ERROR_GETTING_DATASETS } from '../constants';

function replaceLabel({ datastore, ...dataset }) {
	return {
		datastore: datastore.label,
		...dataset,
	};
}

export default function* handleDatasets() {
	const { response, data } = yield call(cmf.sagas.http.get, '/datasets.json');
	if (!response.ok) {
		yield put({
			type: ERROR_GETTING_DATASETS,
			data,
		});
	} else {
		yield put(cmf.actions.collections.addOrReplace('datasets', data.map(replaceLabel)));
	}
}
