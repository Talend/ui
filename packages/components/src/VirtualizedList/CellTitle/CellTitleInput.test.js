import React from 'react';
import { shallow, mount } from 'enzyme';
import keycode from 'keycode';
import faker from 'faker';

import CellTitleInput from './CellTitleInput.component';

faker.seed(42);
describe('CellTitleInput', () => {
	it('should render the input', () => {
		// given
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellTitleInput
				id={faker.random.word()}
				cellData={faker.random.words()}
				onEditCancel={jest.fn()}
				onEditSubmit={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should call submit callback on blur', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		const id = faker.random.word();
		const expectedValue = faker.random.words();

		const wrapper = mount(
			<CellTitleInput
				id={id}
				cellData={expectedValue}
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.find(`#${id}`).simulate('blur');

		// then
		expect(onEditSubmit).toBeCalledWith(expect.anything(), {
			value: expectedValue,
			model: rowData,
		});
	});

	it('should call submit callback on form submit', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		const id = faker.random.word();
		const expectedValue = faker.random.words();

		const wrapper = mount(
			<CellTitleInput
				id={id}
				cellData={expectedValue}
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.simulate('submit');

		// then
		expect(onEditSubmit).toBeCalledWith(expect.anything(), {
			value: expectedValue,
			model: rowData,
		});
	});

	it('should call cancel callback on ESC keyup', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();
		const event = { keyCode: keycode('escape') };

		const id = faker.random.word();

		const wrapper = mount(
			<CellTitleInput
				id={id}
				cellData={faker.random.words()}
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.find(`#${id}`).simulate('keyUp', event);

		// then
		expect(onEditCancel).toBeCalledWith(expect.anything(), rowData);
	});
});
