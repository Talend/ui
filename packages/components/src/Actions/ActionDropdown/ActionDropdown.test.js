import React from 'react';
import { mount, shallow } from 'enzyme';
import ActionDropdown, { InjectDropdownMenuItem, getMenuItem } from './ActionDropdown.component';

function getComponent(key) {
	const Fake = props => <div {...props} />;
	Fake.displayName = key;
	return Fake;
}

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
