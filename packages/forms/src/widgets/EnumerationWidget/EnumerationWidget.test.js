import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnumerationWidget from './EnumerationWidget';

jest.mock(
	'../../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props =>
		/* eslint-disable */
		<div id="autoSizer">{ props.children({ height: 30, width: 30 }) }</div>
	/* eslint-enable */
);

describe('EnumerationWidget', () => {
	it('should be in default mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in default mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{
					required: true,
				}}
			/>);
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
					{ id: '111', values: ['titi', 'tata'] },
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
					{ id: '111', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		const checkbox = wrapper.find('input[type="checkbox"]').at(0);
		checkbox.simulate('change');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should select an item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('change');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});


	it('should select multiple  items', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
					{ id: '112', values: ['titi2', 'tata2'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('change');
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('change');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should select range of items', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
					{ id: '112', values: ['titi2', 'tata2'] },
					{ id: '113', values: ['titi3', 'tata3'] },
					{ id: '114', values: ['titi4', 'tata4'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('change');
		wrapper.find('.tc-enumeration-item-label').at(3).simulate('change', { shifKey: true });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('delete all', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
			/>
		);
		wrapper.find('.tc-enumeration-item [type="checkbox"]').at(0).simulate('change');
		wrapper.find('.tc-enumeration-item [type="checkbox"]').at(1).simulate('change');

		// when click on trash icon
		wrapper.find('.tc-enumeration-header').find('.btn-link').first().simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should delete an item with callHandler', () => {
		const registry = {
			formContext: {
				handleAction: jest.fn(),
			},
		};

		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				registry={registry}
				formData={[
					{ id: '11212242', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(1)
			.simulate('click');

		// then
		expect(registry.formContext.handleAction).toBeCalled();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
