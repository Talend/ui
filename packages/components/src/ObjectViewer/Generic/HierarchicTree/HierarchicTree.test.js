import React from 'react';
import { shallow } from 'enzyme';
import HierarchicTree, { TreeItem } from './HierarchicTree.component';

describe('HierarchicTree', () => {
	it('should render', () => {
		const wrapper = shallow(<HierarchicTree />);
		expect(wrapper).toMatchSnapshot();
	});
});

describe('TreeItem', () => {
	it('should render', () => {
		const wrapper = shallow(<TreeItem />);
		expect(wrapper).toMatchSnapshot();
	});
});
