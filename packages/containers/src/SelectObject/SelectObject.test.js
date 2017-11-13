import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './SelectObject.component';
import Container, { DEFAULT_STATE } from './SelectObject.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './SelectObject.connect';

describe('Component SelectObject', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Component name="Hello world" />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Container SelectObject', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container name="Hello world" />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					SelectObject: {
						SelectObject: DEFAULT_STATE.toJS(),
					},
				}),
			},
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		const dispatch = () => {};
		const props = mapDispatchToProps(dispatch);
		expect(typeof props).toBe('object');
	});
});

