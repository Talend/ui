import React from 'react';
import { mount } from 'enzyme';
import { mock } from '@talend/react-cmf';

import ConnectedDataGrid from './DataGrid.connect';

describe('#ConnectedDataGrid', () => {
	it('should render a connected DataGrid', () => {
		const context = mock.store.context();
		const wrapper = mount(<ConnectedDataGrid />, mock.Provider.getEnzymeOption(context));
		expect(wrapper.find(ConnectedDataGrid.CMFContainer).type().displayName).toBe('CMF(Container(DataGrid))');
	});
});
