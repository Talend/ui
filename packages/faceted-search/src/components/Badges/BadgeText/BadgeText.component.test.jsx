import { render } from '@testing-library/react';
import { BadgeText } from './BadgeText.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeText', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			label: 'My Label',
			id: 'myId',
			t: getDefaultT(),
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeText {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const props = {
			id: 'potatoId',
			initialOpenedOperator: true,
			label: 'all the stuff',
			value: 'init value',
			t: getDefaultT(),
		};
		// When
		render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeText {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(document.querySelector('#potatoId-badge-text-action-overlay')).toHaveTextContent(
			'init value',
		);
	});
});
