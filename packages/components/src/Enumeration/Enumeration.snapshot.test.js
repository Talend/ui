import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Enumeration from './Enumeration.component';
import toJsonWithoutI18n from '../../test/props-without-i18n';

jest.mock(
	'react-virtualized/dist/commonjs/AutoSizer/AutoSizer',
	() => props => <div id="autoSizer">{props.children({ height: 1000, width: 1000 })}</div>, // eslint-disable-line react/prop-types
);

jest.mock(
	'../Actions/Action',
	() => props => <div id="ActionMock" {...props} />, // eslint-disable-line react/prop-types
);

describe('Enumeration', () => {
	it('should render Header in default mode', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			items: [],
			headerInput: [],
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(),
				},
			],
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(
			toJsonWithoutI18n(wrapper.find('HeaderEnumeration > Header > header')),
		).toMatchSnapshot();
	});

	it('should render Header in search mode', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_SEARCH',
			items: [],
			headerInput: [],
			headerDefault: [],
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(
			toJsonWithoutI18n(wrapper.find('HeaderEnumeration > HeaderInput > header')),
		).toMatchSnapshot();
	});

	it('should render Header in add mode', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_ADD',
			inputPlaceholder: 'New entry',
			headerDefault: [],
			headerInput: [
				{
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(),
				},
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(),
				},
			],
			items: [],
			onAddChange: jest.fn(),
			onAddKeyDown: jest.fn(),
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(
			toJsonWithoutI18n(wrapper.find('HeaderEnumeration > HeaderInput > header')),
		).toMatchSnapshot();
	});

	it('should render Header in add mode with error', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_ADD',
			inputPlaceholder: 'New entry',
			headerError: 'an error occurred',
			headerDefault: [],
			headerInput: [
				{
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(),
				},
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(),
				},
			],
			items: [],
			onAddChange: jest.fn(),
			onAddKeyDown: jest.fn(),
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(
			toJsonWithoutI18n(wrapper.find('HeaderEnumeration > HeaderInput > header')),
		).toMatchSnapshot();
	});

	it('should render Header in selection mode', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_SELECTED',
			headerDefault: [],
			headerSelected: [
				{
					label: 'Selected value',
					id: 'select',
					onClick: jest.fn(),
				},
			],
			items: Array(3)
				.fill('')
				.map((item, index) => ({
					values: [`Lorem ipsum dolor sit amet ${index}`],
				})),
			itemsProp: {
				key: 'values',
				getItemHeight: () => 42,
				actionsDefault: [],
			},
		};
		props.items[0].isSelected = true;
		props.items[1].isSelected = true;

		const wrapper = mount(<Enumeration {...props} />);
		expect(
			toJsonWithoutI18n(wrapper.find('HeaderEnumeration > HeaderSelected > header')),
		).toMatchSnapshot();
	});

	it('should render Header with custom label', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			required: true,
			headerDefault: [],
			items: [],
			label: 'Users',
		};

		const wrapper = mount(<Enumeration {...props} />);
		expect(
			toJsonWithoutI18n(wrapper.find('HeaderEnumeration > Header > header')),
		).toMatchSnapshot();
	});

	it("should render with EmptyListPlaceholder in default mode when there's no items in list", () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			items: [],
			headerInput: [],
			headerDefault: [],
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(toJsonWithoutI18n(wrapper.find('ItemsEnumeration'))).toMatchSnapshot();
	});

	it("should render with EmptyListPlaceholder in search mode when there's no items in list", () => {
		const props = {
			displayMode: 'DISPLAY_MODE_SEARCH',
			items: [],
			headerInput: [],
			headerDefault: [],
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(toJsonWithoutI18n(wrapper.find('ItemsEnumeration'))).toMatchSnapshot();
	});

	it('should render list in default state and required component', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			required: true,
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(),
				},
			],
			items: Array(3)
				.fill('')
				.map((item, index) => ({
					values: [`Lorem ipsum dolor sit amet ${index}`],
				})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				onSelectItem: jest.fn(),
				getItemHeight: () => 42,
				actionsDefault: [
					{
						disabled: false,
						label: 'Edit',
						icon: 'talend-pencil',
						id: 'edit',
						onClick: jest.fn(),
					},
					{
						label: 'Delete',
						icon: 'talend-trash',
						id: 'delete',
						onClick: jest.fn(),
					},
				],
			},
			onAddChange: jest.fn(),
			onAddKeyDown: jest.fn(),
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(toJsonWithoutI18n(wrapper.find('.tc-enumeration-item'))).toMatchSnapshot();
	});

	it('should render item in edit mode', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			currentEdit: {},
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(),
				},
			],
			items: Array(3)
				.fill('')
				.map((item, index) => ({
					values: [`Lorem ipsum dolor sit amet ${index}`],
				})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				getItemHeight: () => 42,
				actionsDefault: [],
				actionsEdit: [
					{
						disabled: false,
						label: 'Validate',
						icon: 'talend-check',
						id: 'validate',
						onClick: jest.fn(),
					},
					{
						disabled: false,
						label: 'Cancel',
						icon: 'talend-cross',
						id: 'abort',
						onClick: jest.fn(),
					},
				],
			},
			onAddChange: jest.fn(),
			onAddKeyDown: jest.fn(),
		};
		props.items[0].displayMode = 'DISPLAY_MODE_EDIT';

		// when
		const wrapper = mount(<Enumeration {...props} />);

		// then
		const itemInEditMode = wrapper.find('.tc-enumeration-item').at(0);
		expect(toJson(itemInEditMode.find('input'))).toMatchSnapshot();
		expect(toJson(itemInEditMode.find('.tc-enumeration-item-actions'))).toMatchSnapshot();
	});

	it('should render item in edit mode with error', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			currentEdit: {
				validate: {
					disabled: true,
				},
			},
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(),
				},
			],
			items: Array(3)
				.fill('')
				.map((item, index) => ({
					values: [`Lorem ipsum dolor sit amet ${index}`],
				})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				getItemHeight: () => 42,
				actionsDefault: [],
				actionsEdit: [
					{
						disabled: false,
						label: 'Validate',
						icon: 'talend-check',
						id: 'validate',
						onClick: jest.fn(),
					},
					{
						disabled: false,
						label: 'Cancel',
						icon: 'talend-cross',
						id: 'abort',
						onClick: jest.fn(),
					},
				],
			},
			onAddChange: jest.fn(),
			onAddKeyDown: jest.fn(),
		};
		props.items[0].displayMode = 'DISPLAY_MODE_EDIT';
		props.items[0].error = 'an error occured';

		// when
		const wrapper = mount(<Enumeration {...props} />);

		// then
		const itemInEditMode = wrapper.find('.tc-enumeration-item').at(0);
		expect(toJson(itemInEditMode)).toMatchSnapshot();
	});

	it('should render selected items', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_SELECTED',
			headerDefault: [],
			headerSelected: [
				{
					label: 'Selected value',
					id: 'select',
					onClick: jest.fn(),
				},
			],
			items: Array(3)
				.fill('')
				.map((item, index) => ({
					values: [`Lorem ipsum dolor sit amet ${index}`],
				})),
			itemsProp: {
				key: 'values',
				getItemHeight: () => 42,
				actionsDefault: [],
			},
		};
		props.items[0].isSelected = true;
		props.items[1].isSelected = true;

		// when
		const wrapper = mount(<Enumeration {...props} />);

		// then
		const selectedItems = wrapper.find('.tc-enumeration-item.selected-item');
		expect(selectedItems.length).toBe(2);
	});

	it('should render selected mode with checkboxes', () => {
		const props = {
			showCheckboxes: true,
			displayMode: 'DISPLAY_MODE_SELECTED',
			headerSelected: [
				{
					label: 'Selected value',
					id: 'select',
					onClick: jest.fn(),
				},
			],
			items: Array(3)
				.fill('')
				.map((item, index) => ({
					values: [`Lorem ipsum dolor sit amet ${index}`],
				})),
			itemsProp: {
				key: 'values',
				getItemHeight: () => 42,
				actionsDefault: [],
			},
		};
		props.items[0].isSelected = true;
		props.items[1].isSelected = true;

		// when
		const wrapper = mount(<Enumeration {...props} />);

		// then
		const items = wrapper.find('.tc-enumeration-item');
		expect(toJson(items)).toMatchSnapshot();
	});
	it('should render a dynamic height matching length of rows', () => {
		const ROW_HEIGHT = 42;
		const items = Array(3)
			.fill('')
			.map((_, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			}));
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(),
				},
			],
			items,
			itemsProp: {
				key: 'values',
				calculateListHeight: listItems => {
					if (listItems.length) {
						return listItems.length * ROW_HEIGHT;
					}
					return 0;
				},
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				onSelectItem: jest.fn(),
				getItemHeight: () => ROW_HEIGHT,
				actionsDefault: [
					{
						disabled: false,
						label: 'Edit',
						icon: 'talend-pencil',
						id: 'edit',
						onClick: jest.fn(),
					},
					{
						label: 'Delete',
						icon: 'talend-trash',
						id: 'delete',
						onClick: jest.fn(),
					},
				],
			},
			onAddChange: jest.fn(),
			onAddKeyDown: jest.fn(),
		};
		const wrapper = mount(<Enumeration {...props} />);
		expect(wrapper.find('div[test-id="enumeration-items-list"]').prop('style')).toEqual({
			height: '126px',
		});
	});
});
