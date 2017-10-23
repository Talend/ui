import {
	mapStateToViewProps,
} from '../src/settings';
import mock from '../src/mock';

describe('mapStateToViewProps', () => {
	it('should apply default views from displayName if no view are passed', () => {
		const state = mock.state();
		state.cmf.settings.views.MyComponent = { foo: 'bar' };
		const props = mapStateToViewProps(state, { views: undefined }, 'MyComponent');
		expect(props.foo).toBe('bar');
	});

	it('should apply default views from displayName and componentId if no view are passed', () => {
		const state = mock.state();
		state.cmf.settings.views.MyComponent = { foo: 'bar' };
		state.cmf.settings.views['MyComponent#my-component-id'] = { foo: 'baz' };
		const props = mapStateToViewProps(state, { view: undefined }, 'MyComponent', 'my-component-id');
		expect(props.foo).toBe('baz');
	});
});
