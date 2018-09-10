import React from 'react';
import { shallow } from 'enzyme';
import List from './List.component';
import JSONLike from '../JSONLike';

describe('ObjectViewer.List', () => {
	it('should render List with props data as an object', () => {
		// Given
		const schema = new Map();
		schema.set('field0', 'type1').set('field1', 'type2');
		const data = {
			dataset: [{ field0: 'header1' }, { field1: 'header2' }],
			schema,
		};
		// When
		const wrapper = shallow(<List id="my-object-list" data={data} flat />);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render List with props data as an array', () => {
		// Given
		const data = [{ field0: 'header1' }, { field1: 'header2' }];
		// When
		const wrapper = shallow(<List id="my-object-list" data={data} flat />);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render null if no data', () => {
		const data = [{ foo: 'bar' }, {}];
		const wrapper = shallow(<List data={data} />);
		const element = wrapper.getElement();
		expect(element.type).toBe('ul');
		expect(wrapper.hasClass('tc-object-viewer')).toBe(true);
		expect(wrapper.find('li').length).toBe(2);
		expect(wrapper.find(JSONLike).length).toBe(2);
		expect(
			wrapper
				.find(JSONLike)
				.first()
				.props(),
		).toEqual({
			data: data[0],
			jsonpath: '$[0]',
		});
	});
});
