import React from 'react';
import { shallow } from 'enzyme';
import VirtualizedTree from './VirtualizedTree.component';

describe('VirtualizedTree', () => {
	it('should render the autosize from react virtualized', () => {
		const cellRenderer = () => <div>MyCellRenderer</div>;
		const wrapper = shallow(<VirtualizedTree rowCount={10} cellRenderer={cellRenderer} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
