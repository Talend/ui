import cmf from '@talend/react-cmf';
import { isSafeUrl } from '@talend/utils';
import { call, put, takeEvery, take } from 'redux-saga/effects';

import Connected from './HeaderBar.connect';
import Constants from './HeaderBar.constant';

function isValidProduct(product) {
	return (
		!!product &&
		typeof product === 'object' &&
		isSafeUrl(product.url) &&
		(product.id === undefined || typeof product.id === 'string') &&
		(product.name === undefined || typeof product.name === 'string') &&
		(product.icon === undefined || typeof product.icon === 'string')
	);
}

/**
 * This saga takes care of fetching authorized products for the HeaderBar
 * container according to the provided products URL in the action's payload.
 * @param {Object} action
 */
export function* fetchProducts(action) {
	const { url } = action.payload;

	yield put(Connected.setStateAction({ productsFetchState: Constants.FETCHING_PRODUCTS }));

	const { response, data } = yield call(cmf.sagas.http.get, url);

	if (response.ok) {
		// Success, update collection
		yield put(Connected.setStateAction({ productsFetchState: Constants.FETCH_PRODUCTS_SUCCESS }));
		yield put(
			cmf.actions.collections.addOrReplace(
				Constants.COLLECTION_ID,
				Array.isArray(data) ? data.filter(isValidProduct) : [],
			),
		);
	} else {
		// Loading products failed
		yield put(Connected.setStateAction({ productsFetchState: Constants.FETCH_PRODUCTS_ERROR }));
	}
}

/**
 * Handle the opening of a product from the HeaderBar
 * Behavior will be extended in the future (interaction with browser extension ...),
 * for now we only handle link opening
 * @param {Object} action
 */
export function handleOpenProduct(action) {
	const url = action && action.payload && action.payload.url;
	if (isSafeUrl(url)) {
		window.location.assign(url);
	}
}

function* defaultHandler() {
	yield takeEvery(Constants.HEADER_BAR_FETCH_PRODUCTS, fetchProducts);
	yield takeEvery(Constants.HEADER_BAR_OPEN_PRODUCT, handleOpenProduct);
	yield take('DO_NOT_QUIT');
}

export default {
	'HeaderBar#default': defaultHandler,
};
