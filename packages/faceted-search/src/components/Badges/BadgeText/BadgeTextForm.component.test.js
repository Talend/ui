import { render, fireEvent, screen } from '@testing-library/react';
import { BadgeTextForm } from './BadgeTextForm.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeTextForm', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			id: 'myId',
			onSubmit: jest.fn(),
			feature: 'name',
			t: () => 'Apply',
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeTextForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'potatoId',
			category: 'potato',
			onSubmit,
			value: 'init value',
			feature: 'name',
			t: () => 'Apply',
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeTextForm {...props} />
			</BadgeFacetedProvider>,
		);

		// Then
		expect(screen.getByRole('textbox')).toHaveValue('init value');

		fireEvent.submit(document.querySelector('button[type="submit"]'));

		expect(onSubmit).toHaveBeenCalled();
	});
});
