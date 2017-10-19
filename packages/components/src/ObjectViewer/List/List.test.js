import React from 'react';
import { shallow } from 'enzyme';
import List from './List.component';

describe('ObjectViewer.List', () => {
	it('should render null if no data', () => {
		const wrapper = shallow(
			<List />
		);
		expect(wrapper.getNode()).toBe(null);
	});
	it('should render null if no data', () => {
		const data = [{ foo: 'bar' }, {}];
		const wrapper = shallow(
			<List data={data} />
		);
		const element = wrapper.getNode();
		expect(element.type).toBe('ul');
		expect(wrapper.hasClass('tc-object-viewer')).toBe(true);
		expect(wrapper.find('li').length).toBe(2);
		expect(wrapper.find('JSONLike').length).toBe(2);
		expect(wrapper.find('JSONLike').first().props()).toEqual({
			data: data[0],
			jsonpath: '$[0]',
		});
	});
});
