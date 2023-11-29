/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useCollectionSelection from './useCollectionSelection.hook';

function SelectionComponent({ collection, initialSelectedIds, idKey, isSelected, ...props }) {
	const hookReturn = useCollectionSelection(collection, initialSelectedIds, idKey);
	return (
		<div data-testid="SelectionComponent" data-props={JSON.stringify(hookReturn)}>
			<button onClick={() => props.testIsSelected(hookReturn.isSelected)}>isSelected</button>
			<button onClick={() => hookReturn.onToggleAll()}>onToggleAll</button>

			{collection.map(item => (
				<input
					key={item ? item[idKey] : 'null'}
					type="checkbox"
					value={hookReturn.isSelected(item)}
					onChange={() => hookReturn.onToggleItem(item)}
					data-testid={`onToggle-${item ? item[idKey] : 'null'}`}
				/>
			))}
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
];

describe('useCollectionSelection', () => {
	it('should set initial selection list', () => {
		// given
		const initialSelectedIds = [1, 4];

		// when
		render(
			<SelectionComponent
				collection={collection}
				initialSelectedIds={initialSelectedIds}
				idKey="number"
			/>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('SelectionComponent').dataset.props);
		expect(props.selectedIds).toEqual([1, 4]);
	});

	it('should set initial selection list with unloaded items', () => {
		// given
		const caseCollection = [...collection, null];
		const initialSelectedIds = [1, 4];

		// when
		render(
			<SelectionComponent
				collection={caseCollection}
				initialSelectedIds={initialSelectedIds}
				idKey="number"
			/>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('SelectionComponent').dataset.props);
		expect(props.selectedIds).toEqual([1, 4]);
	});

	it('should filter selected items according to the existing collection', () => {
		// given
		const initialSelectedIds = [1, 4];

		// when
		render(
			<SelectionComponent collection={[]} initialSelectedIds={initialSelectedIds} idKey="number" />,
		);

		// then
		const props = JSON.parse(screen.getByTestId('SelectionComponent').dataset.props);
		expect(props.selectedIds).toEqual([]);
	});

	it('should provide a function to check an item selection', async () => {
		const user = userEvent.setup();

		// given
		const initialSelectedIds = [1, 4];
		const testIsSelected = jest.fn();
		// when
		render(
			<SelectionComponent
				collection={collection}
				initialSelectedIds={initialSelectedIds}
				idKey="number"
				testIsSelected={testIsSelected}
			/>,
		);
		await user.click(screen.getByText('isSelected'));

		// then
		const isSelected = testIsSelected.mock.calls[0][0];
		expect(isSelected(collection[0])).toBe(false);
		expect(isSelected(collection[1])).toBe(true);
		expect(isSelected(collection[2])).toBe(false);
		expect(isSelected(collection[3])).toBe(false);
		expect(isSelected(collection[4])).toBe(true);
	});

	it('should provide a function to check an item selection that supports unloaded items', async () => {
		const user = userEvent.setup();

		// given
		const initialSelectedIds = [1, 4];
		const testIsSelected = jest.fn();
		// when
		render(
			<SelectionComponent
				collection={[...collection, null]}
				initialSelectedIds={initialSelectedIds}
				idKey="number"
				testIsSelected={testIsSelected}
			/>,
		);
		await user.click(screen.getByText('isSelected'));

		// then
		const isSelected = testIsSelected.mock.calls[0][0];
		expect(isSelected(collection[0])).toBe(false);
		expect(isSelected(collection[1])).toBe(true);
		expect(isSelected(collection[2])).toBe(false);
		expect(isSelected(collection[3])).toBe(false);
		expect(isSelected(collection[4])).toBe(true);
		expect(isSelected(collection[6])).toBe(false);
	});

	it('should set new item selection', async () => {
		const user = userEvent.setup();

		// given
		render(<SelectionComponent collection={collection} idKey="number" />);
		let selectedIds = JSON.parse(
			screen.getByTestId('SelectionComponent').dataset.props,
		).selectedIds;
		expect(selectedIds).toEqual([]);

		// when
		await user.click(screen.getByTestId('onToggle-0'));

		// then
		selectedIds = JSON.parse(screen.getByTestId('SelectionComponent').dataset.props).selectedIds;
		expect(selectedIds).toEqual([0]);

		// when
		await user.click(screen.getByTestId('onToggle-4'));

		// then
		selectedIds = JSON.parse(screen.getByTestId('SelectionComponent').dataset.props).selectedIds;
		expect(selectedIds).toEqual([0, 4]);

		// when
		await user.click(screen.getByTestId('onToggle-0'));

		// then
		selectedIds = JSON.parse(screen.getByTestId('SelectionComponent').dataset.props).selectedIds;
		expect(selectedIds).toEqual([4]);
	});

	it('should provide the "select all" status', async () => {
		const user = userEvent.setup();

		// when
		render(
			<SelectionComponent
				collection={collection}
				initialSelectedIds={[0, 1, 2, 3, 4]}
				idKey="number"
			/>,
		);

		// then
		let allIsSelected = JSON.parse(
			screen.getByTestId('SelectionComponent').dataset.props,
		).allIsSelected;
		expect(allIsSelected).toBe(true);

		// when
		await user.click(screen.getByTestId('onToggle-0'));

		// then
		allIsSelected = JSON.parse(
			screen.getByTestId('SelectionComponent').dataset.props,
		).allIsSelected;
		expect(allIsSelected).toBe(false);
	});

	it('should provide the "select all" status with unloaded items', () => {
		// given
		const caseCollection = [...collection, null];
		const selection = [0, 1, 2, 3, 4];

		// when
		render(
			<SelectionComponent
				collection={caseCollection}
				initialSelectedIds={selection}
				idKey="number"
			/>,
		);

		// then
		const allIsSelected = JSON.parse(
			screen.getByTestId('SelectionComponent').dataset.props,
		).allIsSelected;
		expect(allIsSelected).toBe(false);
	});

	it('should toggle all', async () => {
		const user = userEvent.setup();

		// given
		render(<SelectionComponent collection={collection} idKey="number" />);

		// when
		await user.click(screen.getByText('onToggleAll'));

		// then
		const allIsSelected = JSON.parse(
			screen.getByTestId('SelectionComponent').dataset.props,
		).allIsSelected;
		expect(allIsSelected).toBe(true);
	});
});
