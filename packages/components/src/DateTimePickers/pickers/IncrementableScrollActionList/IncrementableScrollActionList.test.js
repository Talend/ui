import React from 'react';
import { shallow } from 'enzyme';

import IncrementableScrollActionList from './IncrementableScrollActionList.component';

const items = [
	{
		id: 1,
		label: 'item 1',
	},
	{
		id: 2,
		label: 'item 2',
	},
	{
		id: 3,
		label: 'item 3',
	},
	{
		id: 4,
		label: 'item 4',
	},
	{
		id: 5,
		label: 'item 5',
	},
	{
		id: 6,
		label: 'item 6',
	},
	{
		id: 7,
		label: 'item 7',
	},
	{
		id: 8,
		label: 'item 8',
	},
	{
		id: 9,
		label: 'item 9',
	},
	{
		id: 10,
		label: 'item 10',
	},
	{
		id: 11,
		label: 'item 11',
	},
];

describe('IncrementableScrollActionList', () => {
	describe('render', () => {
		it('should render', () => {
			const wrapper = shallow(
				<IncrementableScrollActionList
					items={items}
					onSelect={() => {}}
					selectedItemId={3}
					initialMiddleVisibleItemId={2}
				/>,
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a row with a PickerAction based on the item given', () => {
			const wrapper = shallow(<IncrementableScrollActionList items={items} onSelect={() => {}} />);

			const itemRenderer = wrapper.prop('itemRenderer');

			const itemRender = itemRenderer(items[0]);

			expect(itemRender).toMatchSnapshot();
		});
	});

	it('should default render with "initialIndex" at 0 when no "initialMiddleVisibleItemId" prop exists', () => {
		const wrapper = shallow(<IncrementableScrollActionList items={items} onSelect={() => {}} />);

		expect(wrapper.prop('initialIndex')).toBe(0);
	});

	it('should render with "initialIndex" as index of "initialMiddleVisibleItemId" minus two', () => {
		const wrapper = shallow(
			<IncrementableScrollActionList
				items={items}
				onSelect={() => {}}
				initialMiddleVisibleItemId={6}
			/>,
		);

		const index = 5 - 2;

		expect(wrapper.prop('initialIndex')).toBe(index);
	});

	it('should have the selected PickerAction based on the associated "selectedItemId" when exists', () => {
		const wrapper = shallow(
			<IncrementableScrollActionList items={items} selectedItemId={2} onSelect={() => {}} />,
		);

		const itemRenderer = wrapper.prop('itemRenderer');

		const itemsRendered = items.map(itemRenderer);

		const selectedItemsRendered = itemsRendered.filter(
			itemRendered => itemRendered.props.isSelected === true,
		);

		expect(selectedItemsRendered).toHaveLength(1);
		expect(selectedItemsRendered[0].props.label).toBe('item 2');
	});

	it('should not have any selected PickerAction when no associated "selectedItemId" exists', () => {
		const wrapper = shallow(<IncrementableScrollActionList items={items} onSelect={() => {}} />);

		const itemRenderer = wrapper.prop('itemRenderer');

		const itemsRendered = items.map(itemRenderer);

		const selectedItemsRendered = itemsRendered.filter(
			itemRendered => itemRendered.props.isSelected === true,
		);

		expect(selectedItemsRendered).toHaveLength(0);
	});

	it('should callback "onSelect" when clicking on the PickerAction with the associated item', () => {
		const onSelect = jest.fn();
		const itemClicked = items[6];

		const wrapper = shallow(<IncrementableScrollActionList items={items} onSelect={onSelect} />);

		const itemRenderer = wrapper.prop('itemRenderer');

		const itemRendered = itemRenderer(itemClicked);
		const itemWrapper = shallow(itemRendered);

		itemWrapper.simulate('click');

		expect(onSelect).toHaveBeenCalledWith(itemClicked);
	});
});
