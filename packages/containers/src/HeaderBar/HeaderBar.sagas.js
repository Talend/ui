
import cmf from '@talend/react-cmf';
import { call, put, takeEvery, take } from 'redux-saga/effects';

import Connected from './HeaderBar.connect';
import { Actions } from './HeaderBar.constant';

/**
 * This saga takes care of fetching authorized products for the HeaderBar
 * container according to the provided products URL in the action's payload.
 * @param {Object} action
 */
export function* fetchProducts(action) {
	const { url, lang, env } = action.payload;
	const productsUrl = `${url}?lang=${lang}&env=${env}`;

	yield put(Connected.setStateAction({ fetchingProducts: true }));

	const { response, data } = yield call(cmf.sagas.http.get, productsUrl);

	yield put(Connected.setStateAction({ fetchingProducts: false }));

	if (!response.ok) {
		return; // Loading products failed, do nothing
	}

	yield put(cmf.actions.collections.addOrReplace(Connected.PRODUCTS_COLLECTION_ID, data));
}

/**
 * Handle the opening of a product from the HeaderBar
 * @param {Object} action
 */
export function handleOpenProduct(action) {
	if ('uri' in action.payload) {
		window.open(action.payload.uri, '_blank');
	}
}

function* defaultHandler() {
	yield takeEvery(Actions.HEADER_BAR_FETCH_PRODUCTS, fetchProducts);
	yield takeEvery(Actions.HEADER_BAR_OPEN_PRODUCT, handleOpenProduct);
	yield take('DO_NOT_QUIT');
}

export default {
	'HeaderBar#default': defaultHandler,
};
