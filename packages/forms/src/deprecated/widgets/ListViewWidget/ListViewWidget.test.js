import React from 'react';
import { mount } from 'enzyme';
import ListViewWidget from './ListViewWidget';

/* eslint-disable */
jest.mock('react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props => (
	<div id="autoSizer">{props.children({ height: 30, width: 30 })}</div>
));
jest.useFakeTimers();
/* eslint-enable */

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
		id: 'my-widget',
		options: {
			enumOptions: values.map(getValueLabelPair),
		},
		multiple: true,
		value: selected || [],
		disabled: false,
		readonly: false,
		autofocus: false,
	};
}

function switchToSearchMode(wrapper) {
	wrapper.find('.tc-listview-header button').at(0).simulate('click');
}

function simulateSearch(wrapper, value) {
	wrapper.find('.tc-listview-header input').at(0).simulate('change', { target: { value } });
	jest.runAllTimers();
}

describe('ListViewWidget', () => {
	it('should detect props change to update state.items', () => {
		const values = ['A', 'B', 'C', 'D'];
		const nextValues = ['A', 'F', 'G', 'H'];
		const onChange = jest.fn();
		let wrapper = mount(
			<ListViewWidget {...generateProps(values, values.slice(0, 2))} onChange={onChange} />,
		);
		const items = wrapper.state('items');
		expect(wrapper.state('items').length).toEqual(4);
		expect(wrapper.state('items')[0].label).toEqual('A');

		// when
		wrapper = wrapper.setProps(generateProps(nextValues, nextValues.slice(0, 2)));
		// then

		const newItems = wrapper.state('items');
		expect(items).not.toEqual(newItems);
		expect(newItems.length).toEqual(4);
		expect(newItems[0].label).toEqual('A');
		expect(newItems[0].checked).toBe(false);
		expect(newItems[1].label).toEqual('F');
		expect(newItems[1].checked).toBe(false);
	});

	describe('toggleAll', () => {
		it('should check every items', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values, values.slice(0, 2))}
				/>,
			);

			// when
			wrapper.find('#my-widget-toggle-all').simulate('change');

			// then
			expect(onChangeHandler).toBeCalledWith(values);
		});

		it('should uncheck every items', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget onChange={onChangeHandler} {...generateProps(values, values)} />,
			);

			// when
			wrapper.find('#my-widget-toggle-all').simulate('change');

			// then
			expect(onChangeHandler).toBeCalledWith([]);
		});

		it('should be checked when every items are checked', () => {
			// given
			const evt = { target: { checked: true } };
			const values = ['A', 'B', 'C', 'D'];
			const wrapper = mount(<ListViewWidget onChange={jest.fn()} {...generateProps(values)} />);

			// when
			values.forEach((_, i) => {
				wrapper
					.find(`input#checkbox-my-widget-${i + 1}-item`)
					.at(0)
					.simulate('change', evt);
			});

			// then
			expect(wrapper.find('#my-widget-toggle-all').props().checked).toBe(true);
		});

		it('should check only filtered items', () => {
			// given
			const values = ['Azert', 'Bnaze', 'Cvbn', 'Dfgh'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget onChange={onChangeHandler} {...generateProps(values)} />,
			);
			expect(wrapper.find('withI18nextTranslation(Item)').length).toBe(4);

			// when
			switchToSearchMode(wrapper);
			simulateSearch(wrapper, 'e');
			wrapper.update();
			wrapper.find('#my-widget-toggle-all').simulate('change');
			simulateSearch(wrapper, '');
			wrapper.update();

			// then
			const checkboxes = wrapper.find('.checkbox input');
			expect(checkboxes.filterWhere(n => n.props().checked).length).toBe(2);
		});
	});

	describe('search', () => {
		it('input should be hidden by default', () => {
			// given
			const wrapper = mount(<ListViewWidget {...generateProps([])} />);

			// when
			// nothing

			// then
			expect(wrapper.find('HeaderListView > input').length).toBe(0);
		});

		it('should input should be toggled when clicking on searh icon', () => {
			// given
			const wrapper = mount(<ListViewWidget {...generateProps([])} />);

			// when
			wrapper.find('button').at(0).simulate('click');

			// then
			expect(wrapper.find('HeaderListView input').length).toBe(1);
		});

		it('should filter displayed items', () => {
			// given
			const values = ['Azert', 'Bnaze', 'Cvbn', 'Dfgh'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget onChange={onChangeHandler} {...generateProps(values)} />,
			);
			expect(wrapper.find('withI18nextTranslation(Item)').length).toBe(4);

			// when
			switchToSearchMode(wrapper);
			simulateSearch(wrapper, 'e');
			wrapper.update();

			// then
			expect(wrapper.find('withI18nextTranslation(Item)').length).toBe(2);
		});

		it('should display a message when no results was found', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			const wrapper = mount(
				<ListViewWidget onChange={onChangeHandler} {...generateProps(values)} />,
			);
			expect(wrapper.find('withI18nextTranslation(Item)').length).toBe(4);

			// when
			switchToSearchMode(wrapper);
			simulateSearch(wrapper, 'E');
			wrapper.update();

			// then
			expect(wrapper.find('withI18nextTranslation(Item)').length).toBe(0);
			expect(wrapper.find('span').at(0).text()).toBe(NO_RESULT_MESSAGE);
		});
	});

	it('should only returns checked', () => {
		// given
		const evt = { target: { checked: true } };
		const values = ['A', 'B', 'C', 'D'];
		const handler = jest.fn();
		const wrapper = mount(<ListViewWidget onChange={handler} {...generateProps(values)} />);

		// when
		wrapper.find('input#checkbox-my-widget-2-item').at(0).simulate('change', evt);
		wrapper.find('input#checkbox-my-widget-3-item').at(0).simulate('change', evt);

		// then
		expect(handler).toBeCalledWith(['B', 'C']);
	});

	it('should display empty label if list is empty', () => {
		// given
		const values = [];

		// When
		const wrapper = mount(<ListViewWidget {...generateProps(values)} />);

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
			const wrapper = mount(<ListViewWidget {...generateProps(values)} />);

			// then
			values.forEach((v, i) => {
				const node = wrapper.find(`#my-widget-${i + 1}-item label`).at(0);
				expect(node.text()).toBe(v.label);
			});
		});

		it('should display key if no labels are availables', () => {
			// given
			const values = ['key1', 'key2', 'key3', 'key4'];
			const wrapper = mount(<ListViewWidget {...generateProps(values)} />);

			// then
			values.forEach((v, i) => {
				const node = wrapper.find(`#my-widget-${i + 1}-item label`).at(0);
				expect(node.text()).toBe(v);
			});
		});

		it('should returns keys even if label are provided', () => {
			// given
			const evt = { target: { checked: true } };
			const values = [{ value: 'key1', label: 'Label 1' }];
			const handler = jest.fn();
			const wrapper = mount(<ListViewWidget onChange={handler} {...generateProps(values)} />);

			// when
			wrapper.find('input#checkbox-my-widget-0-item').at(0).simulate('change', evt);

			// then
			expect(handler).toBeCalledWith(['key1']);
		});
	});
});
