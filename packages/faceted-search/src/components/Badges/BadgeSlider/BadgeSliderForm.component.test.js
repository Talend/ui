import { render, screen, fireEvent } from '@testing-library/react';
import { BadgeSliderForm } from './BadgeSliderForm.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeSliderForm', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should mount a badge with a greaterThan slider', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
			operator: { name: 'greaterThan' },
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		const slider = screen.getByRole('slider');
		expect(slider).toHaveAttribute('aria-valuenow', '0');
		expect(slider).toHaveAttribute('aria-valuemin', '0');
		expect(slider).toHaveAttribute('aria-valuemax', '100');
		expect(slider.parentElement).toHaveClass('theme-tc-slider-rc-slider--track-greater-than');
	});

	it('should mount an badge with an equals slider', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
			operator: { name: 'equals' },
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		const slider = screen.getByRole('slider');
		expect(slider).toHaveAttribute('aria-valuenow', '0');
		expect(slider).toHaveAttribute('aria-valuemin', '0');
		expect(slider).toHaveAttribute('aria-valuemax', '100');
		expect(slider.parentElement).toHaveClass('theme-tc-slider-rc-slider--track-equals');
	});

	it('should mount a default badge in edit mode', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			value: 43,
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);

		window.HTMLFormElement.prototype.requestSubmit = jest.fn();
		fireEvent.click(screen.getByLabelText('Edit directly'));
		// Then
		expect(screen.getByRole('spinbutton')).toHaveValue(43);
	});

	it('should mount a default badge in error mode (oor)', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			value: 666,
			min: 6,
			max: 76,
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);

		expect(document.querySelector('.tc-badge-slider-form-error')).toHaveTextContent(
			'The value must be between 6 and 76',
		);
		expect(document.querySelector('button[type="submit"]')).toBeDisabled();
	});

	it('should mount a default badge in error mode (decimal)', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			value: 5.6,
			decimal: false,
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);

		expect(document.querySelector('.tc-badge-slider-form-error')).toHaveTextContent(
			'Please fill with an integer value',
		);
		expect(document.querySelector('button[type="submit"]')).toBeDisabled();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'customId',
			onSubmit,
			onChange: jest.fn(),
			value: 45,
			feature: 'quality',
			editing: true,
			t: getDefaultT(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		// wrapper.find('.tc-badge-value-unit').first().simulate('click');
		fireEvent.click(screen.getByLabelText('Edit directly'));
		expect(document.querySelector('input[type="number"]')).toHaveValue(45);

		const submitButton = document.querySelector('button[type="submit"]');
		fireEvent.submit(submitButton);

		expect(onSubmit).toHaveBeenCalled();
	});
});
