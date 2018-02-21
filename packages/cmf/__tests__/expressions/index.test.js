import Immutable from 'immutable';
import expressions from '../../src/expressions';
import mock from '../../src/mock';

describe('expressions', () => {
	it('should export some expressions', () => {
		expect(expressions['cmf.collections.get']).toBeDefined();
		expect(expressions['cmf.components.get']).toBeDefined();
	});
	describe('cmf.collections.get', () => {
		it('should get collection content', () => {
			const context = mock.context();
			const state = mock.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'my title',
				}),
			});
			context.store.getState = () => state;
			expect(expressions['cmf.collections.get']({ context }, 'article.title', 'no title'))
				.toBe('my title');
		});
		it('should return default value if collection doesn\'t exists', () => {
			const context = mock.context();
			const state = mock.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({});
			expect(expressions['cmf.collections.get']({ context }, 'article.title', 'no title'))
				.toBe('no title');
		});
	});
	describe('cmf.components.get', () => {
		it('should get component state', () => {
			const context = mock.context();
			const state = mock.state();
			state.cmf.components = new Immutable.Map({
				MyComponent: new Immutable.Map({
					default: new Immutable.Map({
						show: true,
					}),
				}),
			});
			context.store.getState = () => state;
			expect(expressions['cmf.components.get']({ context }, 'MyComponent.default.show', false))
				.toBe(true);
		});
		it('should return default value if no component state', () => {
			const context = mock.context();
			const state = mock.state();
			state.cmf.components = new Immutable.Map({});
			context.store.getState = () => state;
			expect(expressions['cmf.components.get']({ context }, 'MyComponent.default.show', false))
				.toBe(false);
		});
	});
});
