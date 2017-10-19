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
		console.log(context.registry);
		expect(context.registry['_.route.component:foo']).toBe(foo);
		expect(context.registry['expression:baz']).toBe(foo.expressions.baz);
		expect(context.registry['actionCreator:bar']).toBe(foo.actions.bar);
	});
});
