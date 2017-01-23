import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './<%= props.name %>.component';
import Container, { DEFAULT_STATE } from './<%= props.name %>.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './<%= props.name %>.connect';

describe('Component <%= props.name %>', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Component name="Hello world" />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Container <%= props.name %>', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container name="Hello world" />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected <%= props.name %>', () => {
	it('should connect <%= props.name %>', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					<%= props.name %>: {
						<%= props.name %>: DEFAULT_STATE.toJS(),
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

