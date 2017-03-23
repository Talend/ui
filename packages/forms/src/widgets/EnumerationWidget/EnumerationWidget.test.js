import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnumerationWidget from './EnumerationWidget';

describe('EnumerationWidget', () => {
	it('should be in default mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in add mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);

		// when
		wrapper.find('.tc-enumeration-header .btn-link').first().simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in search mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);

		// when
		wrapper.find('.tc-enumeration-header .btn-link').last().simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in edit mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(0)
			.simulate('click');

		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should delete an item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(1)
			.simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should select an item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});


	it('should select multiple  items', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ values: ['titi', 'tata'] },
					{ values: ['titi2', 'tata2'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('click');
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('click', { ctrlKey: true });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('delete all', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ values: ['titi', 'tata'] },
					{ values: ['titi2', 'tata2'] },
				]}
			/>
		);
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('click');
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('click', { ctrlKey: true });

		// when click on trash icon
		wrapper.find('.tc-enumeration-header').find('.btn-link').simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

