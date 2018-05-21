import component from '../src/component';

describe('component', () => {
	it('register add to the registry', () => {
		const context = {
			registry: {},
		};
		function foo() {}
		foo.actions = {
			bar: function bar() {},
		};
		foo.expressions = {
			baz: function baz() {},
		};
		foo.sagas = {
			bas: function bas() {},
		};
		component.register('foo', foo, context);
		expect(Object.keys(context.registry).length).toBe(4);
		expect(context.registry['_.route.component:foo']).toBe(foo);
		expect(context.registry['expression:baz']).toBe(foo.expressions.baz);
		expect(context.registry['actionCreator:bar']).toBe(foo.actions.bar);
		expect(context.registry['SAGA:bas']).toBe(foo.sagas.bas);
	});
	it('get should return component registred', () => {
		function foo() {}
		const context = {
			registry: {
				'_.route.component:foo': foo,
			},
		};
		expect(component.get('foo', context)).toBe(foo);
	});
	it('registerMany should register an index of component', () => {
		const context = { registry: {} };
		const components = {
			foo: function foo() {},
			bar: function bar() {},
			baz: function baz() {},
		};
		component.registerMany(components, context);
		expect(context.registry['_.route.component:foo']).toBe(components.foo);
		expect(context.registry['_.route.component:bar']).toBe(components.bar);
		expect(context.registry['_.route.component:baz']).toBe(components.baz);
	});
});
