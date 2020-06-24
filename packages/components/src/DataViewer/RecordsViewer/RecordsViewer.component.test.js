import React from 'react';
import { shallow } from 'enzyme';
import Component from './RecordsViewer.component';

describe('RecordsViewer', () => {
	it('should render a tree virtualized with a header', () => {
		const wrapper = shallow(<Component rowCount={10} onCollapseAll={jest.fn()} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render a tree (not virtualized) ', () => {
		const wrapper = shallow(<Component virtualized={false} onCollapseAll={jest.fn()} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
