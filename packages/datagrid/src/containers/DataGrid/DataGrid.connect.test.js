import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';

import ConnectedDataGrid from './DataGrid.connect';

describe('#ConnectedDataGrid', () => {
	it('should render a connected DataGrid', () => {
		const context = mock.store.context();
		const wrapper = shallow(<ConnectedDataGrid />, { context });
		expect(wrapper.getElement().type.displayName).toBe('CMF(Container(DataGrid))');
	});
});
