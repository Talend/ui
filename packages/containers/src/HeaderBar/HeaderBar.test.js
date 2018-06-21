import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import Container from './HeaderBar.container';
import Connected, {
	mapStateToProps,
} from './HeaderBar.connect';

describe('Container HeaderBar', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
});

describe('Connected HeaderBar', () => {
	it('should connect HeaderBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should mapStateToProps', () => {
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

	it('should mapStateToProps when products have been already fetched', () => {
		const apps = [{ url: 'foobar' }];
		const state = {
			cmf: {
				collections: new Map({
					[Container.PRODUCTS_COLLECTION_ID]: new List(apps),
				}),
			},
		};
		const ownProps = {};

		const { products: { items } } = mapStateToProps(state, ownProps);

		expect(items.length).toEqual(apps.length);
		expect(Object.keys(items[0])).toEqual(['onClickDispatch', 'url']);
	});
});

