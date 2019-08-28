import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import useCollectionActions from './useCollectionActions.hook';

const Div = () => <div />;
function ActionComponent({ collection, actions, persistentActions }) {
	const hookCollection = useCollectionActions(collection, actions, persistentActions);
	return <Div id="mainChild" collection={hookCollection} />;
}
ActionComponent.propTypes = {
	collection: PropTypes.array,
	actions: PropTypes.array,
	persistentActions: PropTypes.array,
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

export const actions = [
	{
		id: 'edit',
		label: 'Edit',
		onClick: () => {},
	},
	{
		id: 'delete',
		label: 'Delete',
		onClick: () => {},
	},
];

export const persistentActions = [
	{
		label: 'favorite',
		icon: 'talend-star',
		onClick: () => {},
	},
	{
		label: 'certify',
		icon: 'talend-badge',
		onClick: () => {},
	},
];

describe('useCollectionFilter', () => {
	it('should insert actions in collection items', () => {
		// when
		const wrapper = mount(
			<ActionComponent
				collection={collection}
				actions={actions}
				persistentActions={persistentActions}
			/>,
		);

		// then
		const hookCollection = wrapper.find('#mainChild').prop('collection');
		hookCollection.forEach(item => {
			expect(item.actions).toBe(actions);
			expect(item.persistentActions).toBe(persistentActions);
		});
	});
});
