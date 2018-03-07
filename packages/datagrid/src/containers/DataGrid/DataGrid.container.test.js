import React from 'react';
import { shallow } from 'enzyme';

import DataGridContainer, { DISPLAY_NAME } from './DataGrid.container';

describe('#DataGridContainer', () => {
	it('should render DataGridContainer', () => {
		const data = {};
		const wrapper = shallow(<DataGridContainer data={data} />);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('DataGrid').props().data).toBe(data);
		expect(DataGridContainer.displayName).toBe(DISPLAY_NAME);
	});
});
