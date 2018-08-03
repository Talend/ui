import React from 'react';
import { shallow } from 'enzyme';
import List from './List.component';
import Toolbar from './Toolbar';

const props = {
	getComponent: jest.fn(),
	components: {},
};

describe('List', () => {
	it('should render and pass all props to the Toolbar and ListToVirtualizedList', () => {
		const wrapper = shallow(<List {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(Toolbar).props()).toMatchObject(props);
		expect(wrapper.find('ListToVirtualizedList').props()).toMatchObject(props);
	});
});
