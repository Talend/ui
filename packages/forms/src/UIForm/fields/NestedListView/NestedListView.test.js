import React from 'react';
import { shallow } from 'enzyme';

import NestedListView from './NestedListView.component';
import { getItemsProps, initItems } from './NestedListView.utils';

describe('NestedListView component', () => {
	let props;

	beforeEach(() => {
		props = {
			id: 'NestedListView',
			onChange: jest.fn(),
			onFinish: jest.fn(),
			schema: {
				title: 'Nested ListView',
				schema: {
					items: [{
						title: 'Bar',
						key: ['foo', 'bar'],
						titleMap: [
							{ label: 'Baz', value: 'baz' },
							{ label: 'Boo', value: 'boo' },
						],
					}],
					required: true,
					emptyLabel: 'emptyLabel',
					title: 'title',
					noResultLabel: 'noResultLabel',
					placeholder: 'placeholder',
				},
				value: {},
				t: jest.fn(),
			},
		};
	});

	it('should render component', () => {
		// when
		const wrapper = shallow(<NestedListView {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('onChange', () => {
		it('should call both onChange and onFinish props', () => {
			// when
			// const wrapper = shallow(<NestedListView {...props} />);
			// const event = {};
			// const value = { bar: ['baz'] };

			// wrapper.instance().onChange(event, value);

			// // then
			// expect(props.onChange).toHaveBeenCalledWith(event, {
			// 	schema: props.schema,
			// 	...value,
			// });

			// expect(props.onFinish).toHaveBeenCalledWith(event, {
			// 	schema: props.schema,
			// 	...value,
			// });
		});
	});
});

describe('NestedListView utils', () => {
	describe('getItemsProps', () => {
		let items;
		let value;
		let searchCriteria;
		let toggledChildren;

		beforeEach(() => {
			items = [
				{
					key: 'vegetables',
					toggleId: 'vegetables',
					children: [
						{ label: 'potatoe', value: 'potatoe' },
						{ label: 'lettuce', value: 'lettuce' },
					],
				},
				{
					key: 'fruits',
					toggleId: 'fruits',
					children: [
						{ label: 'orange', value: 'orange' },
						{ label: 'kiwi', value: 'kiwi' },
						{ label: 'banana', value: 'banana' },
					],
				},
			];
			value = [];
			searchCriteria = '';
			toggledChildren = [];
		});

		it('should get items props', () => {
			// when
			const props = getItemsProps(items, value, searchCriteria, toggledChildren);

			// then
			expect(props.items).toEqual(items);
			expect(props.searchCriteria).toEqual(searchCriteria);
			expect(props.toggledChildren).toEqual(toggledChildren);
			expect(props.displayedItems).toHaveLength(2);
			expect(props.displayedItems[0].children).toHaveLength(2);
			expect(props.displayedItems[1].children).toHaveLength(3);
		});

		it('should get items props with a preset field value', () => {
			// given
			value = { fruits: ['orange'] };

			// when
			const props = getItemsProps(items, value, searchCriteria, toggledChildren);

			// then
			expect(props.displayedItems[1].children[0].checked).toBe(true);
			expect(props.displayedItems[1].children[1].checked).toBe(false);
			expect(props.displayedItems[1].children[2].checked).toBe(false);
		});

		it('should get items with a whole group selected', () => {
			// given
			value = { fruits: ['orange', 'kiwi', 'banana'] };

			// when
			const props = getItemsProps(items, value, searchCriteria, toggledChildren);

			// then
			expect(props.displayedItems[0].checked).toBe(false);
			expect(props.displayedItems[1].checked).toBe(true);
			expect(props.displayedItems[1].children[0].checked).toBe(true);
			expect(props.displayedItems[1].children[1].checked).toBe(true);
			expect(props.displayedItems[1].children[2].checked).toBe(true);
		});

		it('should get items props when a search criteria is provided', () => {
			// given
			searchCriteria = 'u';

			// when
			const props = getItemsProps(items, value, searchCriteria, toggledChildren);

			// then
			expect(props.displayedItems).toHaveLength(1);
			expect(props.displayedItems[0].children).toHaveLength(1);
			expect(props.searchCriteria).toBe(searchCriteria);
		});

		it('should get items props with toggled children', () => {
			// given
			toggledChildren = ['vegetables'];

			// when
			const props = getItemsProps(items, value, searchCriteria, toggledChildren);

			// then
			expect(props.displayedItems[0].expanded).toBe(true);
			expect(props.displayedItems[1].expanded).toBe(false);
		});
	});

	describe('initItems', () => {
		it('should init items props', () => {
			// given
			const schema = {
				items: [{
					title: 'Bar',
					key: ['foo', 'bar'],
					titleMap: [
						{ label: 'Baz', value: 'baz' },
						{ label: 'Boo', value: 'boo' },
					],
				}],
				required: true,
				emptyLabel: 'emptyLabel',
				title: 'title',
				noResultLabel: 'noResultLabel',
				placeholder: 'placeholder',
			};

			const value = [];
			const searchCriteria = '';
			const toggledChildren = [];

			const callbacks = {
				onExpandToggle: jest.fn(),
				onParentChange: jest.fn(),
				onCheck: jest.fn(),
			};

			// when
			const props = initItems(schema, value, searchCriteria, toggledChildren, callbacks);

			// then
			expect(props.items[0].onExpandToggle).toBe(callbacks.onExpandToggle);
			expect(props.items[0].onChange).toBe(callbacks.onParentChange);
			expect(props.items[0].children[0].onChange).toBe(callbacks.onCheck);
			expect(props.items[0].children[1].onChange).toBe(callbacks.onCheck);
			expect(props.emptyLabel).toBe(schema.emptyLabel);
			expect(props.headerLabel).toBe(schema.title);
			expect(props.noResultLabel).toBe(schema.noResultLabel);
			expect(props.required).toBe(schema.required);
			expect(props.searchPlaceholder).toBe(schema.placeholder);
		});
	});
});
