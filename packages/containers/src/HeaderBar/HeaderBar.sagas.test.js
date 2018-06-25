import HeaderBarDefaultSaga, { fetchProducts, handleOpenProduct } from './HeaderBar.sagas';

describe('HeaderBar sagas', () => {
	describe('fetchProducts', () => {
		it('should fetch HeaderBar products', () => {
			const httpResponse = { response: { ok: true }, data: 'foo' };
			const action = { payload: { url: 'url', lang: 'lang', env: 'env' } };

			const gen = fetchProducts(action);

			gen.next(); // Toggle fetching flag (enable)
			const effect = gen.next().value; // HTTP call
			expect(effect.CALL).toBeDefined();
			gen.next(httpResponse); // Toggle fetching flag (disable)
			gen.next(); // Update CMF collections
			const { done } = gen.next();

			expect(done).toBe(true);
		});

		it('should fetch HeaderBar products and handle an error case', () => {
			const httpResponse = { response: { ok: false } };
			const action = { payload: { url: 'url', lang: 'lang', env: 'env' } };

			const gen = fetchProducts(action);

			gen.next(); // Toggle fetching flag (enable)
			const effect = gen.next().value; // HTTP call
			expect(effect.CALL).toBeDefined();
			gen.next(httpResponse); // Toggle fetching flag (disable)
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
