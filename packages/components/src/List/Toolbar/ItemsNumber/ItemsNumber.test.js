import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ItemsNumber from './ItemsNumber.component';

const props = {
	id: 'list-items-number',
	totalItems: 42,
};
describe('ItemsNumber', () => {
	it('should render total number of items', () => {
		// when
		const wrapper = shallow(<ItemsNumber {...props} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render total number of items + customized title', () => {
		// when
		const wrapper = shallow(<ItemsNumber {...props} label="bananas" />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render total number of items + number of selected items', () => {
		// when
		const wrapper = shallow(<ItemsNumber {...props} selected="11" />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
