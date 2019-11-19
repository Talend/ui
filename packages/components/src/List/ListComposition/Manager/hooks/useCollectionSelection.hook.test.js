import React from 'react';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useCollectionSelection from './useCollectionSelection.hook';

const Div = () => <div />;
function SelectionComponent({ collection, initialSelectedIds, idKey }) {
	const hookReturn = useCollectionSelection(collection, initialSelectedIds, idKey);
	return <Div id="mainChild" {...hookReturn} />;
}
SelectionComponent.propTypes = {
	collection: PropTypes.array,
	initialSelectedIds: PropTypes.array,
	idKey: PropTypes.string,
};

const collection = [
	{
		firstName: 'Watkins',
		lastName: 'Fry',
		number: 0,
	},
	{
		firstName: 'Fannie',
		lastName: 'Carver',
		number: 1,
	},
	{
		firstName: 'Madden',
		lastName: 'Silva',
		number: 2,
	},
	{
		firstName: 'Ferrell',
		lastName: 'Jacobs',
		number: 3,
	},
	{
		firstName: 'Carly',
		lastName: 'Dorsey',
		number: 4,
	},
];

describe('useCollectionSelection', () => {
	it('should set initial selection list', () => {
		// given
		const initialSelectedIds = [1, 4];

		// when
		const wrapper = mount(
			<SelectionComponent
				collection={collection}
				initialSelectedIds={initialSelectedIds}
				idKey="number"
			/>,
		);

		// then
		const selectedIds = wrapper.find('#mainChild').prop('selectedIds');
		expect(selectedIds).toEqual([1, 4]);
	});

	it('should filter selected items according to the existing collection', () => {
		// given
		const initialSelectedIds = [1, 4];

		// when
		const wrapper = mount(
			<SelectionComponent collection={[]} initialSelectedIds={initialSelectedIds} idKey="number" />,
		);

		// then
		const selectedIds = wrapper.find('#mainChild').prop('selectedIds');
		expect(selectedIds).toEqual([]);
	});

	it('should provide a function to check an item selection', () => {
		// given
		const initialSelectedIds = [1, 4];

		// when
		const wrapper = mount(
			<SelectionComponent
				collection={collection}
				initialSelectedIds={initialSelectedIds}
				idKey="number"
			/>,
		);

		// then
		const isSelected = wrapper.find('#mainChild').prop('isSelected');
		expect(isSelected(collection[0])).toBe(false);
		expect(isSelected(collection[1])).toBe(true);
		expect(isSelected(collection[2])).toBe(false);
		expect(isSelected(collection[3])).toBe(false);
		expect(isSelected(collection[4])).toBe(true);
	});

	it('should set new item selection', () => {
		// given
		const wrapper = mount(<SelectionComponent collection={collection} idKey="number" />);

		// when
		let onToggleItem = wrapper.find('#mainChild').prop('onToggleItem');
		act(() => onToggleItem(collection[0]));
		wrapper.update();

		// then
		let selectedIds = wrapper.find('#mainChild').prop('selectedIds');
		expect(selectedIds).toEqual([0]);

		// when
		onToggleItem = wrapper.find('#mainChild').prop('onToggleItem');
		act(() => onToggleItem(collection[4]));
		wrapper.update();

		// then
		selectedIds = wrapper.find('#mainChild').prop('selectedIds');
		expect(selectedIds).toEqual([0, 4]);

		// when
		onToggleItem = wrapper.find('#mainChild').prop('onToggleItem');
		act(() => onToggleItem(collection[0]));
		wrapper.update();

		// then
		selectedIds = wrapper.find('#mainChild').prop('selectedIds');
		expect(selectedIds).toEqual([4]);
	});

	it('should provide the "select all" status', () => {
		// when
		const wrapper = mount(
			<SelectionComponent
				collection={collection}
				initialSelectedIds={[0, 1, 2, 3, 4]}
				idKey="number"
			/>,
		);

		// then
		let allIsSelected = wrapper.find('#mainChild').prop('allIsSelected');
		expect(allIsSelected).toBe(true);

		// when
		const onToggleItem = wrapper.find('#mainChild').prop('onToggleItem');
		act(() => onToggleItem(collection[0]));
		wrapper.update();

		// then
		allIsSelected = wrapper.find('#mainChild').prop('allIsSelected');
		expect(allIsSelected).toBe(false);
	});

	it('should toggle all', () => {
		// given
		const wrapper = mount(<SelectionComponent collection={collection} idKey="number" />);

		// when
		const onToggleAll = wrapper.find('#mainChild').prop('onToggleAll');
		act(() => onToggleAll());
		wrapper.update();

		// then
		const allIsSelected = wrapper.find('#mainChild').prop('allIsSelected');
		expect(allIsSelected).toBe(true);
	});
});
