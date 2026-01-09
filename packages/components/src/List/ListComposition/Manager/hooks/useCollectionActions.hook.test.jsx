/* eslint-disable react/prop-types */
import { screen, render, within } from '@testing-library/react';
import useCollectionActions from './useCollectionActions.hook';

function ActionComponent({ collection, actions, persistentActions }) {
	const hookCollection = useCollectionActions(collection, actions, persistentActions);
	return (
		<div data-testid="ActionComponent" data-collection={JSON.stringify(hookCollection)}>
			{hookCollection.map(item => (
				<div key={item.number} data-testid={item.number}>
					{item.firstName}
					{(item.actions || []).map(action => (
						<button key={action.label} id={action.id} onClick={action.onClick}>
							{action.label}
						</button>
					))}
					{(item.persistentActions || []).map(action => (
						<button key={action.label} id={action.id} onClick={action.onClick}>
							{action.label}
						</button>
					))}
				</div>
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

export const actions = [
	{
		id: 'edit',
		label: 'Edit',
		onClick: jest.fn(),
	},
	{
		id: 'delete',
		label: 'Delete',
		onClick: jest.fn(),
	},
];

export const persistentActions = [
	{
		label: 'favorite',
		icon: 'talend-star',
		onClick: jest.fn(),
	},
	{
		label: 'certify',
		icon: 'talend-badge',
		onClick: jest.fn(),
	},
];

describe('useCollectionFilter', () => {
	it('should insert actions in collection items', () => {
		// when
		render(
			<ActionComponent
				collection={collection}
				actions={actions}
				persistentActions={persistentActions}
			/>,
		);

		// then
		collection.forEach(item => {
			const itemElement = screen.getByText(item.firstName);
			expect(itemElement).toBeVisible();
			expect(within(itemElement).getByText('Edit')).toBeVisible();
			expect(within(itemElement).getByText('Delete')).toBeVisible();
			expect(within(itemElement).getByText('favorite')).toBeVisible();
			expect(within(itemElement).getByText('certify')).toBeVisible();
		});
	});

	it('should insert item-configured actions', () => {
		// given
		const getActions = item => [
			{
				id: 'edit',
				label: `Edit ${item.firstName}`,
				onClick: () => {},
			},
			{
				id: 'delete',
				label: `Delete ${item.firstName}`,
				onClick: () => {},
			},
		];
		const getPersistentActions = item => [
			{
				label: `Set ${item.firstName} as favorite`,
				icon: 'talend-star',
				onClick: () => {},
			},
			{
				label: `Request ${item.firstName} certification`,
				icon: 'talend-badge',
				onClick: () => {},
			},
		];

		// when
		render(
			<ActionComponent
				collection={collection}
				actions={getActions}
				persistentActions={getPersistentActions}
			/>,
		);

		// then
		expect(screen.getByText('Edit Watkins')).toBeVisible();
		expect(screen.getByText('Delete Watkins')).toBeVisible();
		expect(screen.getByText('Set Watkins as favorite')).toBeVisible();
		expect(screen.getByText('Request Watkins certification')).toBeVisible();
	});
});
