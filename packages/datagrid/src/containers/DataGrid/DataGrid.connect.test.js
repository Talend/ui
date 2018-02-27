import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import ConnectedDataGrid, { mapStateToProps, mergeProps } from './DataGrid.connect';

describe('#ConnectedDataGrid', () => {
	it('should render a connected ConnectedDataGrid', () => {
		const context = mock.context();
		const wrapper = shallow(<ConnectedDataGrid />, { context });

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
