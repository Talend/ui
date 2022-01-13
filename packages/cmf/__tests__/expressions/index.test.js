import Immutable from 'immutable';
import expressions from '../../src/expressions';
import { mock } from '../../src';

describe('expressions', () => {
	it('should export some expressions', () => {
		expect(expressions['cmf.collections.get']).toBeDefined();
		expect(expressions['cmf.components.get']).toBeDefined();
		expect(expressions['cmf.collections.includes']).toBeDefined();
		expect(expressions['cmf.components.includes']).toBeDefined();
	});
	describe('cmf.collections.get', () => {
		it('should get collection content', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'my title',
				}),
			});
			context.store.getState = () => state;
			expect(expressions['cmf.collections.get']({ context }, 'article.title', 'no title')).toBe(
				'my title',
			);
		});
		it("should return default value if collection doesn't exists", () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({});
			expect(expressions['cmf.collections.get']({ context }, 'article.title', 'no title')).toBe(
				'no title',
			);
		});
	});

	describe('cmf.collections.includes', () => {
		it('should return true if the value is present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			context.store.getState = () => state;
			expect(expressions['cmf.collections.includes']({ context }, 'article.tags', 'test2')).toBe(
				true,
			);
		});
		it('should return false if the value is not present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			context.store.getState = () => state;
			expect(expressions['cmf.collections.includes']({ context }, 'article.tags', 'test4')).toBe(
				false,
			);
		});
		it("should return false if collection doesn't exists", () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({});
			expect(expressions['cmf.collections.includes']({ context }, 'article.tags', 'test')).toBe(
				false,
			);
		});
	});
	describe('cmf.collections.oneOf', () => {
		it('should return true if one of the values is present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			context.store.getState = () => state;
			expect(
				expressions['cmf.collections.oneOf']({ context }, 'article.tags', ['test2', 'test4']),
			).toBe(true);
		});
		it('should return false if all values are not present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			context.store.getState = () => state;
			expect(
				expressions['cmf.collections.oneOf']({ context }, 'article.tags', ['test4', 'test5']),
			).toBe(false);
		});
		it("should return false if collection doesn't exist", () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({});
			expect(
				expressions['cmf.collections.oneOf']({ context }, 'article.tags', ['test0', 'test1']),
			).toBe(false);
		});
		it('should throw an error if values are not an array', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			expect(() =>
				expressions['cmf.collections.oneOf']({ context }, 'article.tags', 'test'),
			).toThrow(/^You should pass an array of values to check if one of them is present$/);
		});
	});
	describe('cmf.collections.allOf', () => {
		it('should return true if all of the values are present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			context.store.getState = () => state;
			expect(
				expressions['cmf.collections.allOf']({ context }, 'article.tags', [
					'test',
					'test2',
					'test3',
				]),
			).toBe(true);
		});
		it('should return false if not all values are not present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			context.store.getState = () => state;
			expect(
				expressions['cmf.collections.allOf']({ context }, 'article.tags', ['test2', 'test3']),
			).toBe(false);
		});
		it("should return false if collection doesn't exist", () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({});
			expect(
				expressions['cmf.collections.allOf']({ context }, 'article.tags', ['test0', 'test1']),
			).toBe(false);
		});
		it('should throw an error if values are not an array', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => state;
			state.cmf.collections = new Immutable.Map({
				article: new Immutable.Map({
					title: 'title',
					tags: new Immutable.List(['test', 'test2', 'test3']),
				}),
			});
			expect(() =>
				expressions['cmf.collections.allOf']({ context }, 'article.tags', 'test'),
			).toThrow(/^You should pass an array of values to check if all of them are present$/);
		});
	});

	describe('cmf.components.get', () => {
		it('should get component state', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.components = new Immutable.Map({
				MyComponent: new Immutable.Map({
					default: new Immutable.Map({
						show: true,
					}),
				}),
			});
			context.store.getState = () => state;
			expect(
				expressions['cmf.components.get']({ context }, 'MyComponent.default.show', false),
			).toBe(true);
		});
		it('should return default value if no component state', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.components = new Immutable.Map({});
			context.store.getState = () => state;
			expect(
				expressions['cmf.components.get']({ context }, 'MyComponent.default.show', false),
			).toBe(false);
		});
	});

	describe('cmf.components.includes', () => {
		it('should return true if the value is present in the list', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.components = new Immutable.Map({
				MyComponent: new Immutable.Map({
					default: new Immutable.Map({
						tags: new Immutable.List(['tag1', 'tag2', 'tag3']),
						show: true,
					}),
				}),
			});
			context.store.getState = () => state;
			expect(
				expressions['cmf.components.includes']({ context }, 'MyComponent.default.tags', 'tag1'),
			).toBe(true);
		});
		it('should return default false if there is no component state', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			state.cmf.components = new Immutable.Map({});
			context.store.getState = () => state;
			expect(
				expressions['cmf.components.includes']({ context }, 'MyComponent.default.tags', 'tag1'),
			).toBe(false);
		});
	});
});
