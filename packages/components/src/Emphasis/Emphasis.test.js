import React from 'react';
import { shallow } from 'enzyme';
import Emphasis from './Emphasis.component';

describe('Emphasis', () => {
	const props = {
		text: 'The lazy quick brown fox jumps over the lazy dog',
	};

	it('should return a span containing the emphatised text', () => {
		// given
		const wrapper = shallow(<Emphasis {...props} value="brown" />);

		// then
		expect(wrapper.html()).toBe(
			'<span>The lazy quick <em class="theme-highlight">brown</em> fox jumps over the lazy dog</span>',
		);
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

	it('should emphasize if value is not string', () => {
		const text = '85';
		// given
		const wrapper = shallow(<Emphasis text={text} value={8} />);

		// then
		expect(wrapper.find('em').length).toBe(1);
	});
});
