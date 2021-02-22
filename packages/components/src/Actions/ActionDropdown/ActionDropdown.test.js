import React from 'react';
import { mount, shallow } from 'enzyme';
import cases from 'jest-in-case';
import ActionDropdown, { InjectDropdownMenuItem, getMenuItem } from './ActionDropdown.component';

function getComponent(key) {
	const Fake = props => <div {...props} />;
	Fake.displayName = key;
	return Fake;
}

describe('ActionDropdown', () => {
	it('should call onToggle callback when click on trigger', () => {
		// given
		const onToggle = jest.fn();
		const props = {
			id: 'dropdwon-id',
			label: 'Dropdown',
			onToggle,
			items: [
				{ id: 'item1', label: 'Item 1', model: 'model' },
				{ id: 'item2', label: 'Item 2', model: 'model' },
			],
		};

		const actionDropdownInstance = mount(<ActionDropdown {...props} />);
		const dropdownButton = actionDropdownInstance.find('DropdownToggle');

		// when
		dropdownButton.simulate('click');

		// then
		expect(onToggle).toBeCalledWith(true);

		// when
		dropdownButton.simulate('click');

		// then
		expect(onToggle).toBeCalledWith(false);
	});

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
		menuItems.at(0).find('SafeAnchor').simulate('click');

		// then
		expect(onSelectClick).toBeCalledWith(jasmine.anything(), props.items[0]);
		expect(onItemClick.mock.calls[0][1]).toEqual({
			action: { id: 'item1', label: 'Item 1' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[0][0].type).toBe('click');

		// when
		menuItems.at(1).find('SafeAnchor').simulate('click');

		// then
		expect(onSelectClick).toBeCalledWith(jasmine.anything(), props.items[1]);
		expect(onItemClick.mock.calls[1][1]).toEqual({
			action: { id: 'item2', label: 'Item 2' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[1][0].type).toBe('click');
	});

	it('should apply transformation on icon', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'Button label',
			icon: 'talend-ellipsis',
			iconTransform: 'rotate-90',
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />)
			.find('DropdownButton')
			.find('svg.theme-rotate-90');

		// then
		expect(wrapper.exists()).toBeTruthy();
	});
});

describe('getMenuItem', () => {
	it('should return a MenuItem with divider', () => {
		expect(getMenuItem({ divider: true })).toMatchSnapshot();
	});
	it('should return a MenuItem with icon and label', () => {
		expect(
			getMenuItem({ label: 'Toto', icon: 'talend-bell', 'data-feature': 'action.feature' }),
		).toMatchSnapshot();
	});
	it('should return a MenuItem with label', () => {
		expect(getMenuItem({ label: 'Toto', 'data-feature': 'action.feature' })).toMatchSnapshot();
	});
});

describe('InjectDropdownMenuItem', () => {
	it('should render MenuItem with props divider', () => {
		const wrapper = shallow(
			<InjectDropdownMenuItem
				getComponent={getComponent}
				key={0}
				menuItemProps={{ stuff: 'MyItemProps' }}
				divider
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render MenuItem with Inject', () => {
		const wrapper = shallow(
			<InjectDropdownMenuItem
				getComponent={getComponent}
				component="Action"
				key={0}
				menuItemProps={{ stuff: 'MyItemProps' }}
				onSelect={jest.fn()}
				onKeyDown={jest.fn()}
				withMenuItem
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render li with Inject', () => {
		const wrapper = shallow(
			<InjectDropdownMenuItem
				getComponent={getComponent}
				component="Action"
				key={0}
				liProps={{ stuff: 'MyLiProps' }}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Dropup', () => {
	function testSwitch({ containerPosition, menuPosition, isInitialDropup, isDropupExpected }) {
		// given
		const container = document.createElement('div');
		container.classList.add('tc-dropdown-container');
		container.getBoundingClientRect = () => containerPosition;

		const wrapper = mount(
			<ActionDropdown
				items={[{ label: 'item 1' }, { label: 'item 2' }]}
				dropup={isInitialDropup}
			/>,
			{
				attachTo: container,
			},
		);
		container.querySelector('.dropdown-menu').getBoundingClientRect = () => menuPosition;

		// when
		wrapper.find('button').first().simulate('click');

		// then
		expect(container.firstChild.classList.contains('dropup')).toBe(isDropupExpected);
	}

	cases('dropdown/dropup switch', testSwitch, [
		{
			name: 'should dropup on dropdown bottom overflow',
			containerPosition: { top: 60, bottom: 95 },
			menuPosition: { top: 80, bottom: 100, height: 20 },
			isInitialDropup: false,
			isDropupExpected: true,
		},
		{
			name: 'should dropdown on dropup top overflow',
			containerPosition: { top: 0, bottom: 35 },
			menuPosition: { top: -5, bottom: 0 },
			isInitialDropup: true,
			isDropupExpected: false,
		},
		{
			name: 'should do nothing on dropdown without overflow',
			containerPosition: { top: 60, bottom: 95 },
			menuPosition: { top: 80, bottom: 90, height: 10 },
			isInitialDropup: false,
			isDropupExpected: false,
		},
		{
			name: 'should do nothing on dropup without overflow',
			containerPosition: { top: 0, bottom: 60 },
			menuPosition: { top: 20, bottom: 30 },
			isInitialDropup: true,
			isDropupExpected: true,
		},
		{
			name: 'should do nothing on dropdown without enough space (top and bottom)',
			containerPosition: { top: 10, bottom: 30 },
			menuPosition: { top: 20, bottom: 90, height: 60 },
			isInitialDropup: false,
			isDropupExpected: false,
		},
	]);
});
