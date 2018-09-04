import React from 'react';
import { mount, shallow } from 'enzyme';
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
		const classListContainingClass = {
			contains() {
				return true;
			},
		};
		const classListNotContainingClass = {
			contains() {
				return false;
			},
		};
		function getDropdownMenuElement(top, bottom) {
			return {
				classList: classListContainingClass,
				getBoundingClientRect() {
					return { top, bottom };
				},
			};
		}
		const divContainerElement = {
			tagName: 'DIV',
			classList: classListContainingClass,
			getBoundingClientRect() {
				return { top: 0, bottom: 35 };
			},
		};
		const bodyElement = {
			tagName: 'BODY',
			classList: classListNotContainingClass,
			getBoundingClientRect() {
				return { top: 0, bottom: 35 };
			},
		};
		function getActionDropdownEvent(top, bottom, container) {
			return {
				target: {
					classList: classListContainingClass,
					nextSibling: getDropdownMenuElement(top, bottom),
					parentElement: {
						classList: classListNotContainingClass,
						// dropdown container
						// simulate the tc-dropdown-container className
						parentElement: container,
					},
				},
			};
		}
		// dropdown that doesn't overflow
		const event = getActionDropdownEvent(0, 25, divContainerElement);
		// dropdown that is above the top of container
		const topOverflowEvent = getActionDropdownEvent(-5, 10, divContainerElement);
		// dropdown that is under the bottom of container
		const bottomOverflowEvent = getActionDropdownEvent(20, 40, divContainerElement);
		// dropdown that is under the bottom of body element
		const bodyBottomOverflowEvent = getActionDropdownEvent(20, 40, bodyElement);

		const wrapper = shallow(<ActionDropdown.WrappedComponent items={[{ label: 'item 1' }, { label: 'item 2' }]} />);
		expect(wrapper.state().dropup).toBeFalsy();

		// when / then
		wrapper.props().onToggle(true, bottomOverflowEvent);
		expect(wrapper.state().dropup).toBe(true);

		// when / then
		wrapper.props().onToggle(true, topOverflowEvent);
		expect(wrapper.state().dropup).toBeFalsy();

		// when / then
		wrapper.props().onToggle(true, event);
		expect(wrapper.state().dropup).toBeFalsy();

		// when / then
		wrapper.props().onToggle(true, bodyBottomOverflowEvent);
		expect(wrapper.state().dropup).toBe(true);
	});
});
