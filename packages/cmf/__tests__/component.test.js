import component from '../src/component';
import api from '../src/api';

describe('component', () => {
	it('should be same as api.component', () => {
		expect(api.component).toBe(component);
	});
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
		component.register('foo', foo, context);
		expect(Object.keys(context.registry).length).toBe(3);
		expect(context.registry['_.route.component:foo']).toBe(foo);
		expect(context.registry['expression:baz']).toBe(foo.expressions.baz);
		expect(context.registry['actionCreator:bar']).toBe(foo.actions.bar);
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
