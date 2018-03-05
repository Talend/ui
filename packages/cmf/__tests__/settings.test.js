import { generateDefaultViewId, mapStateToViewProps } from '../src/settings';
import mock from '../src/mock';

describe('mapStateToViewProps', () => {
	it('should apply default props from displayName if no view are passed', () => {
		const state = mock.state();
		state.cmf.settings.props.MyComponent = { foo: 'bar' };
		const props = mapStateToViewProps(state, { views: undefined }, 'MyComponent');
		expect(props.foo).toBe('bar');
	});

	it('should apply default props from displayName and componentId if no view are passed', () => {
		const state = mock.state();
		state.cmf.settings.props.MyComponent = { foo: 'bar' };
		state.cmf.settings.props['MyComponent#my-component-id'] = { foo: 'baz' };
		const props = mapStateToViewProps(state, { view: undefined }, 'MyComponent', 'my-component-id');
		expect(props.foo).toBe('baz');
	});
	it('should apply default props from displayName and componentId without HOC', () => {
		const state = mock.state();
		state.cmf.settings.props.MyComponent = { foo: 'bar' };
		state.cmf.settings.props['MyComponent#my-component-id'] = { foo: 'baz' };
		const props = mapStateToViewProps(state, { view: undefined }, 'Translate(Container(MyComponent))', 'my-component-id');
		expect(props.foo).toBe('baz');
	});
});

describe('generateDefaultViewId', () => {
	it('return untouched viewId if properly given', () => {
		const viewId = 'viewId';
		expect(generateDefaultViewId('viewId')).toBe(viewId);
	});

	it('return componentName#componentId if available and viewId i undefined', () => {
		expect(generateDefaultViewId(undefined, 'componentName', 'componentId')).toBe(
			'componentName#componentId',
		);
	});

	it('return componentName if the only given parameter', () => {
		expect(generateDefaultViewId(undefined, 'componentName')).toBe(
			'componentName',
		);
	});

	it('return undefined if all parameter are undefined', () => {
		expect(generateDefaultViewId()).toBe(undefined);
	});

	it('return undefined if only componentId is given (should not be possible)', () => {
		expect(generateDefaultViewId()).toBe(undefined);
	});
});
