import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@talend/react-bootstrap';
import cloneDeep from 'lodash/cloneDeep';

import Item from './Item.component';

const item = {
	values: ['toto'],
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(), // provided click callback
		onAbortItem: jest.fn(), // provided click callback
		onSelectItem: jest.fn(), // provided click callback
		actions: [
			{
				label: 'Edit',
				id: 'edit',
				onClick: jest.fn(), // provided click callback
			},
			{
				label: 'Delete',
				id: 'delete',
				onClick: jest.fn(), // provided click callback
			},
		],
	},
};

describe('Item', () => {
	it('should display value with three buttons and trigger callback on button title click', () => {
		// given
		const props = {
			item,
		};
		const itemInstance = <Item {...props} />;

		// when
		const wrapper = mount(itemInstance);
		const buttons = wrapper.find(Button);

		buttons.at(1).simulate('click', { stopPropagation: () => {} });

		// then
		expect(buttons.length).toBe(3);
		expect(props.item.itemProps.actions[0].onClick).toBeCalled();
	});

	it('should display value with three buttons and trigger callback on item click', () => {
		// given
		const props = {
			item,
		};

		const itemInstance = <Item {...props} />;

		// when
		const wrapper = mount(itemInstance);
		const buttons = wrapper.find(Button);

		buttons.at(0).simulate('click', { stopPropagation: () => {} });

		// then
		expect(buttons.length).toBe(3);
		expect(props.item.itemProps.onSelectItem).toBeCalled();
	});

	it('should display value with only button which are not disabled', () => {
		// given
		const itemWithDisabled = cloneDeep(item);
		itemWithDisabled.itemProps.actions[0].disabled = true;
		const props = {
			item: itemWithDisabled,
		};

		const itemInstance = <Item {...props} />;

		// when
		const wrapper = mount(itemInstance);
		const buttons = wrapper.find('.tc-enumeration-item-actions').at(0).find(Button);

		// then
		expect(buttons.length).toBe(1);
	});

	it('should display a label if "item[key]" is a string', () => {
		const props = {
			item: {
				...item,
				values: 'toto',
			},
		};

		const wrapper = mount(<Item {...props} />);
		expect(wrapper.find('.tc-enumeration-item-label').at(0).text()).toEqual('toto');
	});

	it('should display the item with an icon appended', () => {
		const props = {
			item: {
				...item,
				icon: {
					name: 'talend-warning',
					title: 'mad world',
				},
			},
		};

		const wrapper = mount(<Item {...props} />);
		expect(wrapper.find('TooltipTrigger').at(0).props().label).toBe('mad world');
		expect(wrapper.find('Icon').props().title).toBe('mad world');
		expect(wrapper.find('Icon').length).toBe(1);
	});

	it('should display the item with a class on button', () => {
		const props = {
			item: {
				...item,
				className: 'special',
			},
		};
		const wrapper = mount(<Item {...props} />);
		const buttons = wrapper.find('.tc-enumeration-item').at(0).find(Button);
		const button = buttons.at(0);
		expect(button.props().className.includes('special'));
	});
});
