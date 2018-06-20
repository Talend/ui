
import cmf from '@talend/react-cmf';
import { call, put, select, takeEvery, take } from 'redux-saga/effects';
import HeaderBarContainer from './HeaderBar.container';

/**
 * This saga takes care of fetching authorized products for the HeaderBar
 * container according to the provided products URL in the action's payload.
 * @param {Object} action
 */
function* fetchProducts(action) {
	const collection = yield select(state =>
		cmf.selectors.collections.toJS(state, HeaderBarContainer.PRODUCTS_COLLECTION_ID)
	);

	if (collection) {
		return; // Products has already been fetched, skip HTTP call
	}

	const { url, language, env } = action.payload;
	const productsUrl = `${url}?language=${language}&env=${env}`;

	const { response, data } = yield call(cmf.sagas.http.get, productsUrl);

	if (!response.ok) {
		return; // Loading products failed, do nothing
	}

	yield put(cmf.actions.collections.addOrReplace(HeaderBarContainer.PRODUCTS_COLLECTION_ID, data));
}

/**
 * Handle the opening of a product from the HeaderBar
 * @param {Object} action
 */
function handleOpenProduct(action) {
	window.open(action.payload.url, '_blank');
}

function* defaultHandler() {
	yield takeEvery('HEADER_BAR_RECEIVE_PRODUCT_URL', fetchProducts);
	yield takeEvery('HEADER_BAR_OPEN_PRODUCT', handleOpenProduct);
	yield take('DO_NOT_QUIT');
}

export default {
	'HeaderBar#default': defaultHandler,
};
