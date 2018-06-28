import cmf from '@talend/react-cmf';

import { fetchProducts, handleOpenProduct } from './HeaderBar.sagas';
import Connected from './HeaderBar.connect';
import Constants from './HeaderBar.constant';

describe('HeaderBar sagas', () => {
	describe('fetchProducts', () => {
		const url = '/foo/bar';
		const lang = 'en-EN';

		const action = { payload: { url, lang } };

		it('should fetch HeaderBar products', () => {
			const data = 'foo';
			const httpResponse = { response: { ok: true }, data };

			const gen = fetchProducts(action);

			// Toggle fetching flag (enable)
			let effect = gen.next().value;
			let expected = Connected.setStateAction({ productsFetchState: Constants.FETCHING_PRODUCTS });
			expect(effect.PUT.action).toEqual(expected);

			// HTTP call
			effect = gen.next().value;
			expect(effect.CALL.fn).toEqual(cmf.sagas.http.get);
			expect(effect.CALL.args).toEqual([`${url}?lang=${lang}`]);

			// Toggle fetching flag (enable)
			effect = gen.next(httpResponse).value;
			expected = Connected.setStateAction({ productsFetchState: Constants.FETCH_PRODUCTS_SUCCESS });
			expect(effect.PUT.action).toEqual(expected);

			// Update CMF collections
			effect = gen.next().value;
			expected = cmf.actions.collections.addOrReplace(Constants.COLLECTION_ID, data);
			expect(effect.PUT.action).toEqual(expected);

			const { done } = gen.next();

			expect(done).toBe(true);
		});

		it('should fetch HeaderBar products and handle an error case', () => {
			const httpResponse = { response: { ok: false } };

			const gen = fetchProducts(action);

			// Toggle fetching flag (enable)
			let effect = gen.next().value;
			expect(effect.PUT.action).toEqual(
				Connected.setStateAction({ productsFetchState: Constants.FETCHING_PRODUCTS }),
			);

			// HTTP call
			effect = gen.next().value;
			expect(effect.CALL.fn).toEqual(cmf.sagas.http.get);
			expect(effect.CALL.args).toEqual([`${url}?lang=${lang}`]);

			// Toggle fetching flag (enable)
			effect = gen.next(httpResponse).value;
			expect(effect.PUT.action).toEqual(
				Connected.setStateAction({ productsFetchState: Constants.FETCH_PRODUCTS_ERROR }),
			);

			const { done } = gen.next();

			expect(done).toBe(true);
		});
	});

	describe('handleOpenProduct', () => {
		global.open = jest.fn();

		beforeEach(() => {
			global.open.mockReset();
		});

		it("should open a product's page when an URI is provided", () => {
			const action = { payload: { uri: 'productUri' } };

			handleOpenProduct(action);
			expect(global.open).toHaveBeenCalled();
		});

		it('should do nothing if no product URI is provided', () => {
			const action = { payload: { foo: 'bar' } };

			handleOpenProduct(action);
			expect(global.open).not.toHaveBeenCalled();
		});
	});
});
