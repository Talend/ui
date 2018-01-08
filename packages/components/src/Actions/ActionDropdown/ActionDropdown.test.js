import React from 'react';
import { mount } from 'enzyme';
import ActionDropdown, {
	chooseMenuItemRendering,
	getMenuItem,
	injectMenuItem,
} from './ActionDropdown.component';

describe('ActionDropdown', () => {
	it('should call onSelect callback when click on item', () => {
		// given
		const onSelectClick = jest.fn();
		const onItemClick = jest.fn();
		const props = {
			id: 'dropdwon-id',
			label: 'Dropdown',
			onSelect: onSelectClick,
			items: [
				{ id: 'item1', label: 'Item 1', onClick: onItemClick, model: 'model' },
				{ id: 'item2', label: 'Item 2', onClick: onItemClick, model: 'model' },
			],
		};
		const actionDropdownInstance = mount(<ActionDropdown {...props} />);
		const menuItems = actionDropdownInstance.find('MenuItem');

		// when
		menuItems
			.at(0)
			.find('SafeAnchor')
			.simulate('click');

		// then
		expect(onSelectClick).toBeCalledWith(jasmine.anything(), props.items[0]);
		expect(onItemClick.mock.calls[0][1]).toEqual({
			action: { id: 'item1', label: 'Item 1' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[0][0].type).toBe('click');

		// when
		menuItems
			.at(1)
			.find('SafeAnchor')
			.simulate('click');

		// then
		expect(onSelectClick).toBeCalledWith(jasmine.anything(), props.items[1]);
		expect(onItemClick.mock.calls[1][1]).toEqual({
			action: { id: 'item2', label: 'Item 2' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[1][0].type).toBe('click');
	});
});

describe('chooseMenuItemRendering', () => {
	it('should return disabled item', () => {
		expect(chooseMenuItemRendering(null, [], null)).toMatchSnapshot();
	});
	it('should return an array of MenuItem (props items)', () => {
		const items = [{ label: 'First', icon: 'talend-streams' }];
		expect(chooseMenuItemRendering(null, items, null)).toMatchSnapshot();
	});
	it('should return an array of MenuItem with divider (props items)', () => {
		const items = [{ label: 'First', icon: 'talend-streams' }, { divider: true }];
		expect(chooseMenuItemRendering(null, items, null)).toMatchSnapshot();
	});
	it('should return an array of MenuItem with components injected', () => {
		const getComponent = jest.fn();
		const components = {
			itemsDropdown: [
				{
					component: 'Action',
					actionId: 'menu:first',
				},
			],
		};
		expect(chooseMenuItemRendering(getComponent, null, components)).toMatchSnapshot();
	});
	it('should return an array of MenuItem with components injected and a divider', () => {
		const getComponent = jest.fn();
		const components = {
			itemsDropdown: [
				{
					component: 'Action',
					actionId: 'menu:first',
				},
				{ divider: true },
			],
		};
		expect(chooseMenuItemRendering(getComponent, null, components)).toMatchSnapshot();
	});
});

describe('getMenuItem', () => {
	it('should return a MenuItem with divider', () => {
		expect(getMenuItem({ divider: true })).toMatchSnapshot();
	});
	it('should return a MenuItem with icon and label', () => {
		expect(getMenuItem({ label: 'Toto', icon: 'talend-bell' })).toMatchSnapshot();
	});
	it('should return a MenuItem with label', () => {
		expect(getMenuItem({ label: 'Toto' })).toMatchSnapshot();
	});
});

describe('injectMenuItem', () => {
	it('should return a MenuItem with a divider', () => {
		expect(injectMenuItem(jest.fn(), { divider: true })).toMatchSnapshot();
	});
	it('should return a MenuItem with an Inject', () => {
		expect(injectMenuItem(jest.fn(), { component: 'MyInjectCmp' })).toMatchSnapshot();
	});
});
