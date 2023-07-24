/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCollectionFilter } from './useCollectionFilter.hook';

function FilterComponent({
	collection,
	initialTextFilter,
	filterFunctions,
	initialVisibleColumns,
	initialFilteredColumns,
	...rest
}) {
	const hookReturn = useCollectionFilter(
		collection,
		initialTextFilter,
		filterFunctions,
		initialVisibleColumns,
		initialFilteredColumns,
	);
	return (
		<div data-testid="FilterComponent" data-props={JSON.stringify(hookReturn)}>
			<button onClick={() => hookReturn.setTextFilter(rest.newValue)}>setTextFilter</button>
		</div>
	);
}

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
		render(<FilterComponent collection={collection} />);

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection.length).toBe(6);
		expect(props.filteredCollection[0].firstName).toEqual('Watkins');
		expect(props.filteredCollection[1].firstName).toEqual('Fannie');
		expect(props.filteredCollection[2].firstName).toEqual('Madden');
		expect(props.filteredCollection[3].firstName).toEqual('Ferrell');
		expect(props.filteredCollection[4].firstName).toEqual('Carly');
	});

	it('should filter with provided initial text filter', () => {
		// when
		render(<FilterComponent collection={collection} initialTextFilter="l" />);

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(3);
		expect(props.filteredCollection[0].firstName).toEqual('Madden');
		expect(props.filteredCollection[1].firstName).toEqual('Ferrell');
		expect(props.filteredCollection[2].firstName).toEqual('Carly');
	});

	it('should filter with provided initial text filter using case insensitive and no accents', () => {
		// when
		render(
			<FilterComponent
				collection={[
					{ firstName: 'Léa' },
					{ firstName: 'Léo' },
					{ firstName: 'Léon' },
					{ firstName: 'Lee-Roy' },
					{ firstName: 'Louis' },
				]}
				initialTextFilter="le"
			/>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(4);
		expect(props.filteredCollection[0].firstName).toEqual('Léa');
		expect(props.filteredCollection[1].firstName).toEqual('Léo');
		expect(props.filteredCollection[2].firstName).toEqual('Léon');
		expect(props.filteredCollection[3].firstName).toEqual('Lee-Roy');
	});

	it('should filter with provided initial text filter using case insensitive and no diacritics', () => {
		// when
		render(
			<FilterComponent
				collection={[
					{ firstName: 'Léa' },
					{ firstName: 'Léo' },
					{ firstName: 'Léon' },
					{ firstName: 'Lee-Roy' },
					{ firstName: 'Louis' },
				]}
				initialTextFilter="lē"
			/>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(4);
		expect(props.filteredCollection[0].firstName).toEqual('Léa');
		expect(props.filteredCollection[1].firstName).toEqual('Léo');
		expect(props.filteredCollection[2].firstName).toEqual('Léon');
		expect(props.filteredCollection[3].firstName).toEqual('Lee-Roy');
	});

	it('should filter with new text filter set', async () => {
		// given
		render(<FilterComponent collection={collection} newValue="l" />);

		// when
		await userEvent.click(screen.getByText('setTextFilter'));

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(3);
		expect(props.filteredCollection[0].firstName).toEqual('Madden');
		expect(props.filteredCollection[1].firstName).toEqual('Ferrell');
		expect(props.filteredCollection[2].firstName).toEqual('Carly');
	});

	it('should filter with limited column list', async () => {
		// given
		render(
			<FilterComponent
				collection={collection}
				initialFilteredColumns={['lastName']}
				newValue="l"
			/>,
		);

		// when
		await userEvent.click(screen.getByText('setTextFilter'));

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(1);
		expect(props.filteredCollection[0].lastName).toEqual('Silva');
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
		render(
			<FilterComponent
				collection={collection}
				initialTextFilter="four"
				filterFunctions={filterFunctions}
			/>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(1);
		expect(props.filteredCollection[0].firstName).toEqual('Carly');
	});

	it('should filter taking into account only object fields that are visible in list columns (if visible columns are provided)', () => {
		// when
		render(
			<FilterComponent
				collection={collection}
				initialTextFilter={collection[0].lastName}
				initialVisibleColumns={['firstName', 'number']}
			/>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('FilterComponent').dataset.props);
		expect(props.filteredCollection).toHaveLength(0);
	});
});
