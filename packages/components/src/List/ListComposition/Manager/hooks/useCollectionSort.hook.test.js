/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCollectionSort } from './useCollectionSort.hook';

function SortComponent({ collection, initialSortParams, sortFunctions, ...props }) {
	const hookReturn = useCollectionSort(collection, initialSortParams, sortFunctions);
	return (
		<div data-testid="SortComponent" data-props={JSON.stringify(hookReturn)}>
			<button onClick={() => hookReturn.setSortParams(props.newValue)}>setSortParams</button>
		</div>
	);
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
	{
		firstName: '1',
		lastName: '2',
		id: 5,
	},
	{
		firstName: '11',
		lastName: '11',
		id: 6,
	},
	{
		firstName: '5',
		lastName: '5',
		id: 7,
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
		render(<SortComponent collection={collection} />);

		// then
		const sortedCollection = JSON.parse(
			screen.getByTestId('SortComponent').dataset.props,
		).sortedCollection;
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
		render(<SortComponent collection={collection} initialSortParams={sortParams} />);

		// then
		const sortedCollection = JSON.parse(
			screen.getByTestId('SortComponent').dataset.props,
		).sortedCollection;
		expect(sortedCollection[0].firstName).toEqual('1');
		expect(sortedCollection[1].firstName).toEqual('5');
		expect(sortedCollection[2].firstName).toEqual('11');
		expect(sortedCollection[3].firstName).toEqual('Conner');
		expect(sortedCollection[4].firstName).toEqual('Copeland');
		expect(sortedCollection[5].firstName).toEqual('Louisa');
		expect(sortedCollection[6].firstName).toEqual('Luann');
		expect(sortedCollection[7].firstName).toEqual('Shelly');
	});

	it('should sort with new sort params set', async () => {
		const user = userEvent.setup();

		// given
		const sortParams = {
			sortBy: 'firstName',
			isDescending: true,
		};
		render(<SortComponent collection={collection} newValue={sortParams} />);

		// when
		await user.click(screen.getByText('setSortParams'));

		// then
		const sortedCollection = JSON.parse(
			screen.getByTestId('SortComponent').dataset.props,
		).sortedCollection;
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
			firstName:
				({ sortBy }) =>
				(a, b) => {
					const aValue = a[sortBy];
					const bValue = b[sortBy];
					return aValue[aValue.length - 1].localeCompare(bValue[bValue.length - 1]);
				},
		};

		// when
		render(
			<SortComponent
				collection={collection}
				initialSortParams={sortParams}
				sortFunctions={sortFunctions}
			/>,
		);

		// then
		const sortedCollection = JSON.parse(
			screen.getByTestId('SortComponent').dataset.props,
		).sortedCollection;
		expect(sortedCollection[0].firstName).toEqual('1');
		expect(sortedCollection[1].firstName).toEqual('11');
		expect(sortedCollection[2].firstName).toEqual('5');
		expect(sortedCollection[3].firstName).toEqual('Louisa');
		expect(sortedCollection[4].firstName).toEqual('Copeland');
		expect(sortedCollection[5].firstName).toEqual('Luann');
		expect(sortedCollection[6].firstName).toEqual('Conner');
		expect(sortedCollection[7].firstName).toEqual('Shelly');
	});

	it('should use a natural sort order', () => {
		const sortParams = {
			sortBy: 'label',
			isDescending: false,
		};
		render(<SortComponent collection={natural} initialSortParams={sortParams} />);
		const sortedCollection = JSON.parse(
			screen.getByTestId('SortComponent').dataset.props,
		).sortedCollection;
		expect(sortedCollection[0].label).toEqual('Demo 1');
		expect(sortedCollection[1].label).toEqual('Demo 2');
		expect(sortedCollection[2].label).toEqual('Demo 3');
		expect(sortedCollection[3].label).toEqual('Demo 10');
		expect(sortedCollection[4].label).toEqual('Demo 11');
		expect(sortedCollection[5].label).toEqual('Demo 20');
		expect(sortedCollection[6].label).toEqual('Demo 22');
		expect(sortedCollection[7].label).toEqual('Demo 102');
	});
});
