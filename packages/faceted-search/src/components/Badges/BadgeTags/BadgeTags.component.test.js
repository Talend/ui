import { BadgeTags } from './BadgeTags.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import getDefaultT from '../../../translate';

jest.mock('ally.js');

const badgeFacetedContextValue = {
	dispatch: jest.fn(),
};

describe('BadgeText', () => {
	it('should mount a badge with flat data from callback', async () => {
		// Given
		const callbacks = {
			getTags: () => new Promise(resolve => resolve(['production'])),
		};

		const props = {
			id: 'myId',
			label: 'myLabel',
			initialOperatorOpened: false,
			initialValueOpened: true,
			operators: ['in'],
			callbacks,
			t: getDefaultT(),
		};

		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeTags {...props} />
			</BadgeFacetedProvider>,
		);

		// Then there is a checkbox with data taken from callback
		await waitFor(() => {
			expect(screen.getByRole('checkbox', { name: 'production' })).toBeVisible();
		});

		// Then selecting an item should dispatch proper payload
		await userEvent.click(screen.getByRole('checkbox', { name: 'production' }));
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
					value: [{ checked: true, id: 'production', label: 'production' }],
				},
			},
			type: 'UPDATE_BADGE',
		});
	});

	it('should mount a badge with object data from callback', async () => {
		// Given
		const callbacks = {
			getTags: () => new Promise(resolve => resolve([{ id: '1234', label: 'production' }])),
		};

		const props = {
			id: 'myId',
			label: 'myLabel',
			initialOperatorOpened: false,
			initialValueOpened: true,
			operators: ['in'],
			callbacks,
			t: getDefaultT(),
		};

		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeTags {...props} />
			</BadgeFacetedProvider>,
		);

		// Then there is a checkbox with data taken from callback
		await waitFor(() => {
			expect(screen.getByRole('checkbox', { name: 'production' })).toBeVisible();
		});

		// Then selecting an item should dispatch proper payload
		await userEvent.click(screen.getByRole('checkbox', { name: 'production' }));
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
					value: [{ checked: true, id: '1234', label: 'production' }],
				},
			},
			type: 'UPDATE_BADGE',
		});
	});
});
