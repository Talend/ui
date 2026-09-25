import { render } from '@testing-library/react';
import { BadgeNumber } from './BadgeNumber.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeNumber', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			label: 'Price',
			id: 'myId',
			t: getDefaultT(),
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumber {...props} />
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
			label: 'Price',
			value: '2981723',
			t: getDefaultT(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumber {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(document.querySelector('#customId-badge-number-action-overlay')).toHaveTextContent(
			'2981723',
		);
	});
});
