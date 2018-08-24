import React from 'react';
import { shallow } from 'enzyme';
import Immutable, { Map, List } from 'immutable';

import Container, { DEFAULT_STATE } from './AboutDialog.container';
import Connected, { mapStateToProps } from './AboutDialog.connect';
import Constants from './AboutDialog.constant';

const VERSIONS = {
	version: 'Summer 18',
	services: ['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
		version: '2.8.0-SNAPSHOT',
		build: '87d0dcd-12e0d6f',
		name,
	})),
};
const IMMUTABLE_VERSIONS = Immutable.fromJS(VERSIONS);

describe('Container AboutDialog', () => {
	const state = DEFAULT_STATE;
	const dispatch = jest.fn();
	const containerProps = { icon: 'talend-tdp-colored', state, dispatch };

	it('should render AboutDialog container', () => {
		const wrapper = shallow(<Container {...containerProps} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render AboutDialog container with a list of items', () => {
		const props = {
			...containerProps,
			state: new Map({
				versions: IMMUTABLE_VERSIONS,
			}),
		};

		const wrapper = shallow(<Container {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render AboutDialog container while fetching items', () => {
		const props = {
			...containerProps,
			state: new Map({
				loading: true,
			}),
		};

		const wrapper = shallow(<Container {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Connected AboutDialog', () => {
	it('should connect AboutDialog', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should mapStateToProps with an empty list of products', () => {
		const state = {
			cmf: {
				collections: new Map({
					AboutDialog: {
						[Constants.COLLECTION_ID]: new List(),
					},
				}),
			},
		};
		const ownProps = {};

		const props = mapStateToProps(state, ownProps);

		expect(props).toEqual({});
	});
});
