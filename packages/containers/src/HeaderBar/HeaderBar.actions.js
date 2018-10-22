import Constants from './HeaderBar.constant';

/**
 * Action dispatched when fetching products is required for the container
 * @param {String} url Fetch URL
 * @returns {Object}
 */
export function fetchProducts(url) {
	return {
		type: Constants.HEADER_BAR_FETCH_PRODUCTS,
		payload: { url },
	};
}

/**
 * Action dispatched when clicking on a product in the header bar
 * @param {Object} product Opened product
 * @returns {Object}
 */
export function openProduct(product) {
	return {
		type: Constants.HEADER_BAR_OPEN_PRODUCT,
		payload: product,
	};
}
