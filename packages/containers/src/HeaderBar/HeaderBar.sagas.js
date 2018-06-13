
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
		return;
	}

	const { response, data } = yield call(cmf.sagas.http.get, action.productsUrl);

	if (!response.ok) {
		// Loading products failed, do nothing
		return;
	}

	yield put(cmf.actions.collections.addOrReplace(HeaderBarContainer.PRODUCTS_COLLECTION_ID, data));
}

function* defaultHandler() {
	yield takeEvery('HEADER_BAR_RECEIVE_PRODUCT_URL', fetchProducts);
	yield take('DO_NOT_QUIT');
}

export default {
	'HeaderBar#default': defaultHandler,
};
