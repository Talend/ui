import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../translate';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import { BadgeMenu } from './BadgeMenu.component';

const t = getDefaultT();

const operator = {
	label: 'My Operator',
	name: 'my-operator',
};

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
	dispatch: jest.fn(),
};

const BadgeWithContext = props => (
	<BadgeFacetedProvider value={badgeFacetedContextValue}>
		<BadgeMenu {...props} />
	</BadgeFacetedProvider>
);

describe('BadgeMenu', () => {
	it('should return "All" when there is no value', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['equals'],
			t,
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(document.querySelectorAll('span')[2]).toHaveTextContent('All');
	});
	it('should return "All" when value is empty', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['equals'],
			t,
			value: {},
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(document.querySelectorAll('span')[2]).toHaveTextContent('All');
	});
	it('should mount a badge with object data from callback', async () => {
		// Given
		const callbacks = {
			id: {
				getOptions: () => new Promise(resolve => resolve([{ id: '1234', label: 'production' }])),
			},
		};

		const props = {
			id: 'myId',
			label: 'myLabel',
			initialOperatorOpened: false,
			initialValueOpened: true,
			operators: ['in'],
			callbacks,
			values: [],
			t: getDefaultT(),
			attribute: 'id',
		};

		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeMenu {...props} />
			</BadgeFacetedProvider>,
		);

		// Then there is a checkbox with data taken from callback
		await waitFor(() => {
			expect(screen.getByRole('menuitem')).toBeVisible();
		});
		// Then selecting an item should dispatch proper payload
		await userEvent.click(screen.getByRole('menuitem', { name: 'production' }));
		await userEvent.click(
			screen.getByRole('button', {
				name: /apply/i,
			}),
		);
		expect(badgeFacetedContextValue.dispatch).toHaveBeenCalledWith({
			payload: {
				badgeId: 'myId',
				metadata: { isInCreation: false },
				properties: {
					initialOperatorOpened: false,
					initialValueOpened: false,
					operator: 'in',
					value: { checked: false, id: '1234', label: 'production' },
				},
			},
			type: 'UPDATE_BADGE',
		});
	});
});
