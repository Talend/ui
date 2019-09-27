import React from 'react';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useCollectionFilter } from './useCollectionFilter.hook';

const Div = () => <div />;
function FilterComponent({ collection, initialTextFilter, filterFunctions }) {
	const hookReturn = useCollectionFilter(collection, initialTextFilter, filterFunctions);
	return <Div id="mainChild" {...hookReturn} />;
}
FilterComponent.propTypes = {
	collection: PropTypes.array,
	initialTextFilter: PropTypes.string,
	filterFunctions: PropTypes.object,
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
	{
		firstName: undefined,
		lastName: null,
		number: 5,
	},
];

describe('useCollectionFilter', () => {
	it('should not filter when no text filter is provided', () => {
		// when
		const wrapper = mount(<FilterComponent collection={collection} />);

		// then
		const filteredCollection = wrapper.find('#mainChild').prop('filteredCollection');
		expect(filteredCollection).toBe(collection);
	});

	it('should filter with provided initial text filter', () => {
		// when
		const wrapper = mount(<FilterComponent collection={collection} initialTextFilter="l" />);

		// then
		const filteredCollection = wrapper.find('#mainChild').prop('filteredCollection');
		expect(filteredCollection).toHaveLength(3);
		expect(filteredCollection[0].firstName).toEqual('Madden');
		expect(filteredCollection[1].firstName).toEqual('Ferrell');
		expect(filteredCollection[2].firstName).toEqual('Carly');
	});

	it('should filter with new text filter set', () => {
		// given
		const wrapper = mount(<FilterComponent collection={collection} />);

		let filteredCollection = wrapper.find('#mainChild').prop('filteredCollection');
		expect(filteredCollection).toBe(collection);

		// when
		act(() => {
			wrapper.find('#mainChild').prop('setTextFilter')('l');
		});
		wrapper.update();

		// then
		filteredCollection = wrapper.find('#mainChild').prop('filteredCollection');
		expect(filteredCollection).toHaveLength(3);
		expect(filteredCollection[0].firstName).toEqual('Madden');
		expect(filteredCollection[1].firstName).toEqual('Ferrell');
		expect(filteredCollection[2].firstName).toEqual('Carly');
	});

	it('should filter with custom filter function', () => {
		// given
		const filterFunctions = {
			number: (value, textFilter) =>
				(textFilter === 'one' && value === 1) ||
				(textFilter === 'two' && value === 2) ||
				(textFilter === 'three' && value === 3) ||
				(textFilter === 'four' && value === 4),
		};

		// when
		const wrapper = mount(
			<FilterComponent
				collection={collection}
				initialTextFilter={'four'}
				filterFunctions={filterFunctions}
			/>,
		);

		// then
		const filteredCollection = wrapper.find('#mainChild').prop('filteredCollection');
		expect(filteredCollection).toHaveLength(1);
		expect(filteredCollection[0].firstName).toEqual('Carly');
	});
});
