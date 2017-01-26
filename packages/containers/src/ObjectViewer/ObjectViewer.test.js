import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import { ObjectViewer as Component } from 'react-talend-components';
import Container, { DEFAULT_STATE } from './ObjectViewer.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './ObjectViewer.connect';

const data = [
	{
		int: 1,
		str: 'test data for the object viewer',
		bool: true,
		obj: {
			bool: true,
		},
		arrayInt: [
			1, 2, 3, 4,
		],
		arrayOb: [
			{ foo: 'bar' },
		],
	},
	{
		int: 2,
		str: 'hello world',
		bool: false,
		obj: {
			bool: false,
		},
		arrayOb: [
			{ foo: 3.2 },
		],
	},
];

describe('Component ObjectViewer', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Component data={data} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Container ObjectViewer', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container data={data} />
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
		const props = mapStateToProps(state, {});
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		const dispatch = () => {};
		const props = mapDispatchToProps(dispatch, {});
		expect(typeof props).toBe('object');
	});
});

