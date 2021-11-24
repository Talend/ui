import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import keycode from 'keycode';

import CellTitleInput from './CellTitleInput.component';

describe('CellTitleInput', () => {
	it('should render the input', () => {
		// given
		const rowData = { id: 1 };

		// when
		const wrapper = mount(
			<CellTitleInput
				id="my-cell"
				cellData="my value"
				onEditCancel={jest.fn()}
				onEditSubmit={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should call submit callback on blur', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		const wrapper = mount(
			<CellTitleInput
				id="my-cell-input"
				cellData="my value"
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.find('input#my-cell-input').simulate('blur');

		// then
		expect(onEditSubmit).toBeCalledWith(expect.anything(), {
			value: 'my value',
			model: rowData,
		});
	});

	it('should call submit callback on form submit', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		const wrapper = mount(
			<CellTitleInput
				id="my-cell-input"
				cellData="my value"
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.simulate('submit');

		// then
		expect(onEditSubmit).toBeCalledWith(expect.anything(), {
			value: 'my value',
			model: rowData,
		});
	});

	it('should call cancel callback on ESC keyup', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();
		const event = { keyCode: keycode('escape') };

		const wrapper = mount(
			<CellTitleInput
				id="my-cell-input"
				cellData="my value"
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.find('input#my-cell-input').simulate('keyUp', event);

		// then
		expect(onEditCancel).toBeCalledWith(expect.anything(), rowData);
	});
});
