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
	it('should switch to dropup when it is near the bottom of a tc-dropdown-container', () => {
		// given
		function getDropdownMenuElement(top, bottom) {
			return {
				getBoundingClientRect() {
					return { top, bottom };
				},
			};
		}
		function getActionDropdownEvent(top, bottom) {
			return {
				target: {
					nextSibling: getDropdownMenuElement(top, bottom),
					parentElement: {
						classList: {
							contains() {
								return false;
							},
						},
						// dropdown container
						// simulate the tc-dropdown-container className
						parentElement: {
							classList: {
								contains() {
									return true;
								},
							},
							getBoundingClientRect() {
								return { top: 0, bottom: 35 };
							},
						},
					},
				},
			};
		}
		// dropdown that doesn't overflow
		const event = getActionDropdownEvent(0, 25);
		// dropdown that is above the top of container
		const topOverflowEvent = getActionDropdownEvent(-5, 10);
		// dropdown that is under the bottom of container
		const bottomOverflowEvent = getActionDropdownEvent(20, 40);

		const wrapper = shallow(<ActionDropdown items={[{ label: 'item 1' }, { label: 'item 2' }]} />);
		expect(wrapper.state().dropup).toBe(false);

		// when / then
		wrapper.props().onToggle(true, bottomOverflowEvent);
		expect(wrapper.state().dropup).toBe(true);

		// when / then
		wrapper.props().onToggle(true, topOverflowEvent);
		expect(wrapper.state().dropup).toBe(false);

		// when / then
		wrapper.props().onToggle(true, event);
		expect(wrapper.state().dropup).toBe(false);
	});
});
