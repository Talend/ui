import { render } from '@testing-library/react';

import getDefaultT from '../../../translate';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import { BadgeDate } from './BadgeDate.component';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeDate', () => {
	it('should render a default badge', () => {
		// Given
		const props = {
			label: 'date',
			id: 'myId',
			value: new Date('2011-10-01').getTime(),
			t: getDefaultT(),
		};
		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeDate {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
		expect(document.querySelector('#myId-badge-date-action-overlay')).toHaveTextContent(
			'2011-10-01',
		);
	});
});
