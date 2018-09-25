import mergeModules from '../src/mergeModules';

describe('mergeModule', () => {
	beforeEach(() => {
		mergeModules.onOverride = jest.fn();
	});
	it('should merge components config', () => {
		const a = {
			components: {
				foo: function foo() {},
				bar: function bar() {},
			},
		};
		const b = {
			components: {
				foo: function foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.components.foo).toBe(b.components.foo);
		expect(config.components.bar).toBe(a.components.bar);
		expect(config.components.foo).toBe(b.components.foo);
		expect(config.components.bar).toBe(a.components.bar);
	});
	it('should merge sagas config', () => {
		const a = {
			sagas: {
				foo: function* foo() {},
				bar: function* bar() {},
			},
		};
		const b = {
			sagas: {
				foo: function* foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.sagas.foo).toBe(b.sagas.foo);
		expect(config.sagas.bar).toBe(a.sagas.bar);
		expect(config.sagas.foo).toBe(b.sagas.foo);
		expect(config.sagas.bar).toBe(a.sagas.bar);
	});
	it('should merge expressions config', () => {
		const a = {
			expressions: {
				foo: function* foo() {},
				bar: function* bar() {},
			},
		};
		const b = {
			expressions: {
				foo: function* foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.expressions.foo).toBe(b.expressions.foo);
		expect(config.expressions.bar).toBe(a.expressions.bar);
		expect(config.expressions.foo).toBe(b.expressions.foo);
		expect(config.expressions.bar).toBe(a.expressions.bar);
	});
	it('should merge actionCreators config', () => {
		const a = {
			actionCreators: {
				foo: function* foo() {},
				bar: function* bar() {},
			},
		};
		const b = {
			actionCreators: {
				foo: function* foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.actionCreators.foo).toBe(b.actionCreators.foo);
		expect(config.actionCreators.bar).toBe(a.actionCreators.bar);
		expect(config.actionCreators.foo).toBe(b.actionCreators.foo);
		expect(config.actionCreators.bar).toBe(a.actionCreators.bar);
	});
});
