import mock from 'react-cmf/lib/mock';
import { fromJS } from 'immutable';

import cmfConnect, {
	getComponentName,
	getComponentId,
	getStateToProps,
	getDispatchToProps,
} from './cmfConnect';

describe('cmfConnect.getComponentName', () => {
	it('should return displayName', () => {
		expect(getComponentName({ displayName: 'test' }))
			.toBe('test');
	});
	it('should return name if no displayName', () => {
		expect(getComponentName({ name: 'test' }))
			.toBe('test');
	});
	it('should return Component if no name and no displayName', () => {
		expect(getComponentName({}))
			.toBe('Component');
	});
});

describe('cmfConnect.getComponentId', () => {
	it('should call if it is a function', () => {
		const componentId = props => props.id;
		expect(getComponentId(componentId, { id: 'test' }))
			.toBe('test');
	});
	it('should return if it is a string', () => {
		const componentId = 'test';
		expect(getComponentId(componentId))
			.toBe('test');
	});
	it('should return props.componentId if not componentId provided', () => {
		expect(getComponentId(null, { componentId: 'test' }))
			.toBe('test');
		expect(getComponentId(undefined, { componentId: 'test' }))
			.toBe('test');
	});
});


describe('cmfConnect.getStateToProps', () => {
	it('should call getStateProps', () => {
		const state = mock.state();
		state.cmf.components = fromJS({
			TestComponent: {
				testId: {
					foo: 'bar',
				},
			},
		});
		const props = getStateToProps({
			componentId: 'testId',
			ownProps: {},
			state,
			WrappedComponent: { displayName: 'TestComponent' },
		});
		expect(props.state.get('foo')).toBe('bar');
	});
});
