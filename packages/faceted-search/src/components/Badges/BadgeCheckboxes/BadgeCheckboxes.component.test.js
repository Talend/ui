import { render, within } from '@testing-library/react';

import getDefaultT from '../../../translate';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import { BadgeCheckboxes } from './BadgeCheckboxes.component';

const t = getDefaultT();

const operator = {
	label: 'My Operator',
	name: 'my-operator',
};

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

const BadgeWithContext = props => (
	<BadgeFacetedProvider value={badgeFacetedContextValue}>
		<BadgeCheckboxes {...props} />
	</BadgeFacetedProvider>
);

describe('BadgeCheckboxes', () => {
	it('should return "All" when there is no value', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then

		const badge = document.querySelector('#tc-badge-select-myId-badge-checkboxes');
		expect(within(badge).getByText('All')).toBeVisible();
	});
	it('should return "All" when value is empty', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
			value: [],
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		const badge = document.querySelector('#tc-badge-select-myId-badge-checkboxes');
		expect(within(badge).getByText('All')).toBeVisible();
	});
	it('should return the amount of values when values are equal or greater than 4', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
			value: [
				{ label: 'one', checked: true },
				{ label: 'two', checked: true },
				{ label: 'three', checked: true },
				{ label: 'four', checked: true },
				{ label: 'five', checked: true },
			],
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		const badge = document.querySelector('#tc-badge-select-myId-badge-checkboxes');
		expect(within(badge).getByText('5 values')).toBeVisible();
	});
	it('should return only the checked values', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
			value: [
				{ label: 'one', checked: true },
				{ label: 'two', checked: true },
				{ label: 'three', checked: false },
				{ label: 'four', checked: false },
				{ label: 'five', checked: true },
			],
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		const badge = document.querySelector('#tc-badge-select-myId-badge-checkboxes');
		expect(within(badge).getByText('one')).toBeVisible();
		expect(within(badge).getByText('two')).toBeVisible();
		expect(within(badge).getByText('five')).toBeVisible();
	});
});
