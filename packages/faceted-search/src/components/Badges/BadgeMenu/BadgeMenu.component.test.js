import { render } from '@testing-library/react';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';

import { BadgeMenu } from './BadgeMenu.component';
import getDefaultT from '../../../translate';

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
		<BadgeMenu {...props} />
	</BadgeFacetedProvider>
);

describe('BadgeMenu', () => {
	it('should return "All" when there is no value', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['equals'],
			t,
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(document.querySelectorAll('span')[2]).toHaveTextContent('All');
	});
	it('should return "All" when value is empty', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['equals'],
			t,
			value: {},
		};
		// When
		render(<BadgeWithContext {...props} />);
		// Then
		expect(document.querySelectorAll('span')[2]).toHaveTextContent('All');
	});
});
