import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import ConnectedDataGrid, { mapStateToProps, mergeProps } from './datagrid.connect';

describe('#ConnectedDataGrid', () => {
	it('should render a connected ConnectedDataGrid', () => {
		const context = mock.context();
		const wrapper = shallow(<ConnectedDataGrid />, { context });
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('#ConnectedDataGrid.mapStateToProps', () => {
	it('should map state to the props', () => {
		const collection = {};
		const getIn = jest.fn(() => collection);
		const state = {
			cmf: {
				collections: {
					getIn,
				},
			},
		};
		const props = mapStateToProps(state, {
			source: 'a.b',
		});
		// then
		expect(getIn).toHaveBeenCalledWith(['a', 'b']);
		expect(props).toEqual({
			data: collection,
		});
	});
});

describe('#ConnectedDataGrid.mergeProps', () => {
	it('should merge the props and clean the props', () => {
		const props = mergeProps(
			{},
			{
				other: 'other',
				source: 'a.b',
			},
		);
		// then
		expect(props).toEqual({ other: 'other' });
	});
});
