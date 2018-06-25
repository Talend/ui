import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import Container, { DEFAULT_STATE } from './HeaderBar.container';
import Connected, { mapStateToProps } from './HeaderBar.connect';

describe('Container HeaderBar', () => {
	const state = DEFAULT_STATE;
	const dispatch = jest.fn();
	const containerProps = { state, dispatch };

	it('should render HeaderBar container', () => {
		const props = containerProps;
		expect(shallow(<Container {...props} />).getElement()).toMatchSnapshot();
	});

	it('should render HeaderBar container with a list of items', () => {
		const props = {
			productsItems: [{ foo: 'bar' }],
			...containerProps,
		};

		expect(shallow(<Container {...props} />).getElement()).toMatchSnapshot();
	});

	it('should render HeaderBar container while fetching items', () => {
		const props = {
			...containerProps,
			state: {
				get: jest.fn().mockReturnValue(true),
			},
		};

		expect(shallow(<Container {...props} />).getElement()).toMatchSnapshot();
	});
});

describe('Connected HeaderBar', () => {
	it('should connect HeaderBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should mapStateToProps with an empty list of products', () => {
		const state = {
			cmf: {
				collections: new Map({
					HeaderBar: {
						[Container.PRODUCTS_COLLECTION_ID]: new List(),
					},
				}),
			},
		};
		const ownProps = {};

		const props = mapStateToProps(state, ownProps);

		expect(props).toEqual({});
	});

	it('should mapStateToProps with a list of products', () => {
		const apps = [{ url: 'foobar' }];
		const state = {
			cmf: {
				collections: new Map({
					[Container.PRODUCTS_COLLECTION_ID]: new List(apps),
				}),
			},
		};
		const ownProps = {};

		const { productsItems } = mapStateToProps(state, ownProps);

		expect(productsItems.length).toEqual(apps.length);
	});
});
