import React from 'react';
import { shallow } from 'enzyme';

import DataGrid from './datagrid.component';

function PinHeaderRenderer() {}

function getComponent() {
	return PinHeaderRenderer;
}

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
