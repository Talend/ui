import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './ObjectViewer.component';
import Container, { DEFAULT_STATE } from './ObjectViewer.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './ObjectViewer.connect';

describe('Component ObjectViewer', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Component name="Hello world" />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Container ObjectViewer', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container name="Hello world" />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected ObjectViewer', () => {
	it('should connect ObjectViewer', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					ObjectViewer: {
						ObjectViewer: DEFAULT_STATE.toJS(),
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

