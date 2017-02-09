import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './HomeListView.component';
import Container, { DEFAULT_STATE } from './HomeListView.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './HomeListView.connect';

describe('Component HomeListView', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Component name="Hello world" />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Container HomeListView', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container name="Hello world" />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected HomeListView', () => {
	it('should connect HomeListView', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					HomeListView: {
						HomeListView: DEFAULT_STATE.toJS(),
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

