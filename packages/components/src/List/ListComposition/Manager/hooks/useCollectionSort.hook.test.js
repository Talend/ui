import React from 'react';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useCollectionSort } from './useCollectionSort.hook';

const Div = () => <div />;
function SortComponent({ collection, initialSortParams, sortFunctions }) {
	const hookReturn = useCollectionSort(collection, initialSortParams, sortFunctions);
	return <Div id="mainChild" {...hookReturn} />;
}
SortComponent.propTypes = {
	collection: PropTypes.array,
	initialSortParams: PropTypes.object,
	sortFunctions: PropTypes.object,
};

const collection = [
	{
		firstName: 'Conner',
		lastName: 'Sloan',
		id: 0,
	},
	{
		firstName: 'Luann',
		lastName: 'Hancock',
		id: 1,
	},
	{
		firstName: 'Louisa',
		lastName: 'Holt',
		id: 2,
	},
	{
		firstName: 'Shelly',
		lastName: 'Sanchez',
		id: 3,
	},
	{
		firstName: 'Copeland',
		lastName: 'Dixon',
		id: 4,
	},
];

const natural = [
	{ label: 'Demo 3' },
	{ label: 'Demo 10' },
	{ label: 'Demo 102' },
	{ label: 'Demo 11' },
	{ label: 'Demo 1' },
	{ label: 'Demo 20' },
	{ label: 'Demo 2' },
	{ label: 'Demo 22' },
];

describe('useCollectionSort', () => {
	it('should not sort when no sort params is provided', () => {
		// when
		const wrapper = mount(<SortComponent collection={collection} />);

		// then
		const sortedCollection = wrapper.find('#mainChild').prop('sortedCollection');
		expect(sortedCollection[0].firstName).toEqual(collection[0].firstName);
		expect(sortedCollection[1].firstName).toEqual(collection[1].firstName);
		expect(sortedCollection[2].firstName).toEqual(collection[2].firstName);
		expect(sortedCollection[3].firstName).toEqual(collection[3].firstName);
		expect(sortedCollection[4].firstName).toEqual(collection[4].firstName);
	});

	it('should sort with provided initial sort params', () => {
		// given
		const sortParams = {
			sortBy: 'firstName',
			isDescending: false,
		};

		// when
		const wrapper = mount(<SortComponent collection={collection} initialSortParams={sortParams} />);

		// then
		const sortedCollection = wrapper.find('#mainChild').prop('sortedCollection');
		expect(sortedCollection[0].firstName).toEqual('Conner');
		expect(sortedCollection[1].firstName).toEqual('Copeland');
		expect(sortedCollection[2].firstName).toEqual('Louisa');
		expect(sortedCollection[3].firstName).toEqual('Luann');
		expect(sortedCollection[4].firstName).toEqual('Shelly');
	});

	it('should sort with new sort params set', () => {
		// given
		const wrapper = mount(<SortComponent collection={collection} />);
		const sortParams = {
			sortBy: 'firstName',
			isDescending: true,
		};

		// when
		act(() => {
			wrapper.find('#mainChild').prop('setSortParams')(sortParams);
		});
		wrapper.update();

		// then
		const sortedCollection = wrapper.find('#mainChild').prop('sortedCollection');
		expect(sortedCollection[0].firstName).toEqual('Shelly');
		expect(sortedCollection[1].firstName).toEqual('Luann');
		expect(sortedCollection[2].firstName).toEqual('Louisa');
		expect(sortedCollection[3].firstName).toEqual('Copeland');
		expect(sortedCollection[4].firstName).toEqual('Conner');
	});

	it('should sort with custom sort function', () => {
		// given
		const sortParams = {
			sortBy: 'firstName',
			isDescending: true,
		};

		const sortFunctions = {
			firstName: ({ sortBy }) => (a, b) => {
				const aValue = a[sortBy];
				const bValue = b[sortBy];
				return aValue[aValue.length - 1].localeCompare(bValue[bValue.length - 1]);
			},
		};

		// when
		const wrapper = mount(
			<SortComponent
				collection={collection}
				initialSortParams={sortParams}
				sortFunctions={sortFunctions}
			/>,
		);

		// then
		const sortedCollection = wrapper.find('#mainChild').prop('sortedCollection');
		expect(sortedCollection[0].firstName).toEqual('Louisa');
		expect(sortedCollection[1].firstName).toEqual('Copeland');
		expect(sortedCollection[2].firstName).toEqual('Luann');
		expect(sortedCollection[3].firstName).toEqual('Conner');
		expect(sortedCollection[4].firstName).toEqual('Shelly');
	});

	it('should use a natural sort order', () => {
		const sortParams = {
			sortBy: 'label',
			isDescending: false,
		};
		const wrapper = mount(<SortComponent collection={natural} initialSortParams={sortParams} />);
		expect(wrapper.find('#mainChild').prop('sortedCollection')).toMatchSnapshot();
	});
});
