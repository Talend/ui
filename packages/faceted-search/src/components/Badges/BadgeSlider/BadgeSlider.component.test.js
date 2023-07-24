import { render } from '@testing-library/react';
import { BadgeSlider } from './BadgeSlider.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeSlider', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			label: 'Invalid',
			id: 'myId',
			t: getDefaultT(),
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSlider {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const props = {
			id: 'customId',
			initialOpenedOperator: true,
			label: 'Invalid',
			value: 45,
			t: getDefaultT(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSlider {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(document.querySelector('#customId-badge-slider-action-overlay')).toHaveTextContent('45');
	});
});
