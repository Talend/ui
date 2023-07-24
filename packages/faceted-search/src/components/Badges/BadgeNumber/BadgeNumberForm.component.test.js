import { screen, render, fireEvent } from '@testing-library/react';
import { BadgeNumberForm } from './BadgeNumberForm.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeNumberForm', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'price',
			t: getDefaultT(),
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumberForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'customId',
			onSubmit,
			value: 'i230982903',
			feature: 'price',
			t: getDefaultT(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumberForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		// eslint-disable-next-line jest-dom/prefer-to-have-value
		expect(document.querySelector('input[type="number"]')).toHaveAttribute('value', 'i230982903');
		expect(document.querySelector('input[type="number"]')).toHaveValue(null);

		fireEvent.submit(document.querySelector('button[type="submit"]'));

		expect(onSubmit).toHaveBeenCalled();
	});
});
