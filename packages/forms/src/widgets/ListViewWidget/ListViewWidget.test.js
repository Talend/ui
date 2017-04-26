import React from 'react';
import { mount } from 'enzyme';
import ListViewWidget from './ListViewWidget';

jest.mock(
	'../../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props =>
		/* eslint-disable */
		<div id="autoSizer">{ props.children({ height: 30, width: 30 }) }</div>
		/* eslint-enable */
);

function generateProps(values, selected) {
	return {
		options: {
			enumOptions: values.map(v => ({ label: v, value: v })),
		},
		id: 'root_documents',
		multiple: true,
		value: selected || [],
		disabled: false,
		readonly: false,
		autofocus: false,
	};
}

describe('ListViewWidget', () => {
	describe('toggleAll', () => {
		it('should check every items', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values, values.slice(0, 2))}
				/>
			);

			// when
			wrapper.find('#tc-listview-toggle-all').simulate('change');

			// then
			expect(onChangeHandler).toBeCalledWith(values);
		});

		it('should uncheck every items', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values, values)}
				/>
			);

			// when
			wrapper.find('#tc-listview-toggle-all').simulate('change');

			// then
			expect(onChangeHandler).toBeCalledWith([]);
		});

		it('should be checked when every items are checked', () => {
			// given
			const evt = { target: { checked: true } };
			const values = ['A', 'B', 'C', 'D'];
			const wrapper = mount(
				<ListViewWidget
					onChange={jest.fn()}
					{...generateProps(values)}
				/>
			);

			// when
			values.forEach((_, i) => {
				wrapper.find(`#checkbox-${i + 1}-item`).at(0).simulate('change', evt);
			});

			// then
			expect(wrapper.find('#tc-listview-toggle-all').props().checked).toBe(true);
		});
	});
});
