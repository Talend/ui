import { render } from '@testing-library/react';
import { BadgeDate } from './BadgeDate.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

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
		expect(document.querySelector('button#myId-badge-date-action-overlay')).toHaveTextContent(
			'2011-10-01',
		);
	});
});
