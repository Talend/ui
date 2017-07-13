import React from 'react';
import { mount } from 'enzyme';
import ListViewWidget from './ListViewWidget';

jest.mock(
	'../../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props =>
		/* eslint-disable */
		<div id="autoSizer">{ props.children({ height: 30, width: 30 }) }</div>
	/* eslint-enable */
);

const EMPTY_LIST_MESSAGE = 'This list is empty.';
const NO_RESULT_MESSAGE = 'No result found.';


function getValueLabelPair(item) {
	if (typeof item === 'object') {
		return item;
	}

	return {
		label: item,
		value: item,
	};
}

function generateProps(values, selected) {
	return {
		options: {
			enumOptions: values.map(getValueLabelPair),
		},
		id: 'root_documents',
		multiple: true,
		value: selected || [],
		disabled: false,
		readonly: false,
		autofocus: false,
	};
}

function simulateSearch(wrp, value) {
	return new Promise((res) => {
		wrp.find('HeaderListView > input').simulate('change', { target: { value } });
		setTimeout(res, 401); // because there is a debounce timer
	});
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

		it('should check only filterd items', (cb) => {
			// given
			const values = ['Azert', 'Bnaze', 'Cvbn', 'Dfgh'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values)}
				/>
			);
			expect(wrapper.find('Item').length).toBe(4);

			// when
			wrapper.find('button').at(0).simulate('click');
			simulateSearch(wrapper, 'e')
				.then(() => {
					wrapper.find('#tc-listview-toggle-all').simulate('change');
					return simulateSearch(wrapper, '');
				})
				.then(() => {
					const w = wrapper.find('.checkbox input');
					expect(w.filterWhere(n => n.props().checked).length).toBe(2);
					cb();
				});
		});
	});

	describe('search', () => {
		it('input should be hidden by default', () => {
			// given
			const wrapper = mount(
				<ListViewWidget
					{...generateProps([])}
				/>
			);

			// when
			// nothing

			// then
			expect(wrapper.find('HeaderListView > input').length).toBe(0);
		});

		it('should input should be toggled when clicking on searh icon', () => {
			// given
			const wrapper = mount(
				<ListViewWidget
					{...generateProps([])}
				/>
			);

			// when
			wrapper.find('button').at(0).simulate('click');

			// then
			expect(wrapper.find('HeaderListView > input').length).toBe(1);
		});

		it('should filter displayed items', (cb) => {
			// given
			const values = ['Azert', 'Bnaze', 'Cvbn', 'Dfgh'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values)}
				/>
			);
			expect(wrapper.find('Item').length).toBe(4);

			// when
			wrapper.find('button').at(0).simulate('click');

			simulateSearch(wrapper, 'e')
				.then(() => {
					// then
					expect(wrapper.find('Item').length).toBe(2);
					cb();
				});
		});

		it('should display a message when no results was found', (cb) => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values)}
				/>
			);
			expect(wrapper.find('Item').length).toBe(4);

			// when
			wrapper.find('button').at(0).simulate('click');

			simulateSearch(wrapper, 'E')
				.then(() => {
					// then
					expect(wrapper.find('Item').length).toBe(0);
					expect(wrapper.find('span').at(0).text()).toBe(NO_RESULT_MESSAGE);
					cb();
				});
		});
	});

	it('should only returns checked', () => {
		// given
		const evt = { target: { checked: true } };
		const values = ['A', 'B', 'C', 'D'];
		const handler = jest.fn();
		const wrapper = mount(
			<ListViewWidget
				onChange={handler}
				{...generateProps(values)}
			/>
		);

		// when
		wrapper.find('#checkbox-2-item').at(0).simulate('change', evt);
		wrapper.find('#checkbox-3-item').at(0).simulate('change', evt);

		// then
		expect(handler).toBeCalledWith(['B', 'C']);
	});

	it('should display empty label if list is empty', () => {
		// given
		const values = [];

		// When
		const wrapper = mount(
			<ListViewWidget
				{...generateProps(values)}
			/>
		);

		// then
		expect(wrapper.find('span').at(0).text()).toBe(EMPTY_LIST_MESSAGE);
	});

	describe('enumOptions management', () => {
		it('should display labels if available', () => {
			// given
			const values = [
				{ value: 'key1', label: 'Label 1' },
				{ value: 'key2', label: 'Label 2' },
				{ value: 'key3', label: 'Label 3' },
				{ value: 'key4', label: 'Label 4' },
			];
			const wrapper = mount(
				<ListViewWidget
					{...generateProps(values)}
				/>
			);

			// then
			values.forEach((v, i) => {
				const node = wrapper.find(`#${i + 1}-item`).find('.tc-listview-item-label').at(0);
				expect(node.text()).toBe(v.label);
			});
		});

		it('should display key if no labels are availables', () => {
			// given
			const values = [
				'key1',
				'key2',
				'key3',
				'key4',
			];
			const wrapper = mount(
				<ListViewWidget
					{...generateProps(values)}
				/>
			);

			// then
			values.forEach((v, i) => {
				const node = wrapper.find(`#${i + 1}-item`).find('.tc-listview-item-label').at(0);
				expect(node.text()).toBe(v);
			});
		});

		it('should returns keys even if label are provided', () => {
			// given
			const evt = { target: { checked: true } };
			const values = [{ value: 'key1', label: 'Label 1' }];
			const handler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={handler}
					{...generateProps(values)}
				/>
			);

			// when
			wrapper.find('#checkbox-0-item').at(0).simulate('change', evt);

			// then
			expect(handler).toBeCalledWith(['key1']);
		});
	});
});
