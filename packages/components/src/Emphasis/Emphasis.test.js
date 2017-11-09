import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import Emphasis from './Emphasis.component';

faker.seed(42);
describe('Emphasis', () => {
	const prefix = faker.random.words(5);
	const suffix = faker.random.words(5);
	const props = {
		text: `${prefix} lazy brown lazy ${suffix}`,
	};

	it('should return a span containing the emphatised text', () => {
		// given
		const wrapper = shallow(<Emphasis {...props} value="brown" />);

		// then
		expect(wrapper.html()).toBe(`<span>${prefix} lazy <em>brown</em> lazy ${suffix}</span>`);
	});

	it('should be case insensitive', () => {
		// given
		const wrapper = shallow(<Emphasis {...props} value="bRoWn" />);

		// then
		expect(wrapper.find('em').text()).toBe('brown');
	});

	it('should support special chars', () => {
		// given
		const wrapper = shallow(<Emphasis text="aze.*+?^${}()|[]\wxc" value=".*+?^${}()|[]\" />);

		// then
		expect(wrapper.find('em').text()).toBe('.*+?^${}()|[]\\');
	});

	it('should wrap the original text in a span if no value is provided', () => {
		// when
		const wrapper = shallow(<Emphasis {...props} />);

		// then
		expect(wrapper.html()).toBe(`<span>${props.text}</span>`);
	});

	it('should not emphasise anything if the value is not part of the text', () => {
		// given
		const wrapper = shallow(<Emphasis {...props} value="nopnopnop" />);

		// then
		expect(wrapper.text()).toBe(props.text);
		expect(wrapper.find('em').length).toBe(0);
	});

	it('should emphasise every occurences', () => {
		// given
		const wrapper = shallow(<Emphasis {...props} value="lazy" />);

		// then
		expect(wrapper.find('em').length).toBe(2);
	});
});
