import cmf from '@talend/react-cmf';

import { fetchProducts, handleOpenProduct } from './HeaderBar.sagas';
import Connected from './HeaderBar.connect';
import Constants from './HeaderBar.constant';

describe('HeaderBar sagas', () => {
	describe('fetchProducts', () => {
		const url = '/foo/bar';

		const action = { payload: { url } };

		it('should fetch HeaderBar products', () => {
			const data = 'foo';
			const httpResponse = { response: { ok: true }, data };

			const gen = fetchProducts(action);

			// Toggle fetching flag (enable)
			let effect = gen.next().value;
			let expected = Connected.setStateAction({ productsFetchState: Constants.FETCHING_PRODUCTS });
			expect(effect.payload.action).toEqual(expected);

			// HTTP call
			effect = gen.next().value;
			expect(effect.payload.fn).toEqual(cmf.sagas.http.get);
			expect(effect.payload.args).toEqual([url]);

			// Toggle fetching flag (enable)
			effect = gen.next(httpResponse).value;
			expected = Connected.setStateAction({ productsFetchState: Constants.FETCH_PRODUCTS_SUCCESS });
			expect(effect.payload.action).toEqual(expected);

			// Update CMF collections
			effect = gen.next().value;
			expected = cmf.actions.collections.addOrReplace(Constants.COLLECTION_ID, data);
			expect(effect.payload.action).toEqual(expected);

			const { done } = gen.next();

			expect(done).toBe(true);
		});

		it('should fetch HeaderBar products and handle an error case', () => {
			const httpResponse = { response: { ok: false } };

			const gen = fetchProducts(action);

			// Toggle fetching flag (enable)
			let effect = gen.next().value;
			expect(effect.payload.action).toEqual(
				Connected.setStateAction({ productsFetchState: Constants.FETCHING_PRODUCTS }),
			);

			// HTTP call
			effect = gen.next().value;
			expect(effect.payload.fn).toEqual(cmf.sagas.http.get);
			expect(effect.payload.args).toEqual([url]);

			// Toggle fetching flag (enable)
			effect = gen.next(httpResponse).value;
			expect(effect.payload.action).toEqual(
				Connected.setStateAction({ productsFetchState: Constants.FETCH_PRODUCTS_ERROR }),
			);

			const { done } = gen.next();

			expect(done).toBe(true);
		});
	});

	describe('handleOpenProduct', () => {
		const { location } = window;

		beforeEach(() => {
			delete window.location;
			window.location = { assign: jest.fn() };
		});

		afterAll(() => {
			window.location = location;
		});

		it("should open a product's page when an URL is provided", () => {
			const action = { payload: { url: 'productUrl' } };

			handleOpenProduct(action);
			expect(window.location.assign).toHaveBeenCalledWith('productUrl');
		});

		it('should do nothing if no product URI is provided', () => {
			const action = { payload: { foo: 'bar' } };

			handleOpenProduct(action);
			expect(window.location.assign).not.toHaveBeenCalled();
		});
	});
});
