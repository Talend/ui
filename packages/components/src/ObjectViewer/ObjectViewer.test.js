import React from 'react';
import { shallow } from 'enzyme';
import ObjectViewer from './ObjectViewer.component';

describe('ObjectViewer', () => {
	it('should render Tree by default', () => {
		const wrapper = shallow(<ObjectViewer data={{}} />);
		expect(wrapper.find(ObjectViewer.Tree).length).toBe(1);
		expect(wrapper.name()).toBe('JSONLike');
	});
	it('should render List', () => {
		const wrapper = shallow(<ObjectViewer displayMode="list" data={{}} />);
		expect(wrapper.find(ObjectViewer.List).length).toBe(1);
		expect(wrapper.name()).toBe('List');
	});
	it('should render Tree', () => {
		const wrapper = shallow(<ObjectViewer displayMode="tree" data={{}} />);
		expect(wrapper.find(ObjectViewer.Tree).length).toBe(1);
		expect(wrapper.name()).toBe('JSONLike');
	});
	it('should render Table', () => {
		const wrapper = shallow(<ObjectViewer displayMode="table" data={{}} />);
		expect(wrapper.find(ObjectViewer.Table).length).toBe(1);
		expect(wrapper.name()).toBe('Table');
	});
});
