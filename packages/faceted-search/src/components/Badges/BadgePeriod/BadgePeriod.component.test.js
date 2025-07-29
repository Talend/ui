import { render, within } from '@testing-library/react';

import getDefaultT from '../../../translate';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import { BadgePeriod } from './BadgePeriod.component';

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
		<BadgePeriod {...props} />
	</BadgeFacetedProvider>
);
describe('BadgePeriod', () => {
	it('should return "All" when there is no value', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: [{ id: 'in' }],
			t,
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(
			within(document.querySelector('#tc-badge-select-myId-badge-period')).getByText('All'),
		).toBeVisible();
	});
	it('should return "All" when value is empty', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: [{ id: 'in' }],
			t,
			value: {},
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(
			within(document.querySelector('#tc-badge-select-myId-badge-period')).getByText('All'),
		).toBeVisible();
	});
	it('should display range when custom period is selected', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: [{ id: 'in' }],
			t,
			value: {
				id: 'CUSTOM',
				startDateTime: new Date('2021-01-01'),
				endDateTime: new Date('2021-01-02'),
			},
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(
			within(document.querySelector('#tc-badge-select-myId-badge-period')).getByText(
				'2021-01-01 to 2021-01-02',
			),
		).toBeVisible();
	});
});
