/* eslint-disable react/prop-types */
// rewrite tests using react-testing-library
import { render, screen } from '@testing-library/react';
import { BadgeText } from '../Badges/BadgeText/BadgeText.component';

import { BadgesGenerator } from './BadgesGenerator.component';

describe('BadgesGenerator', () => {
	const badges = [
		{
			properties: {
				attribute: 'name',
				category: 'name',
				label: 'Name',
				type: 'text',
				operator: {
					label: 'Equal',
					name: '=',
					iconName: 'equal',
				},
				operators: [
					{
						label: 'Equal',
						name: '=',
						iconName: 'equal',
					},
				],
			},
			metadata: {
				attribute: 'name',
				case: 'insensitive',
				badgesPerFacet: 'N',
				entitiesPerBadge: '1',
				badgeId: 'name-ed8c6c4a-9025-4ba9-b382-620773ce2ee8',
			},
		},
	];

	const badgesDictionary = {
		text: BadgeText,
	};

	it('should render the html output', () => {
		// Given
		const props = {
			badges,
			badgesDictionary,
			getBadgeFromDict: jest.fn(),
			id: 'my-id',
			t: jest.fn(),
		};
		// When
		const { container } = render(<BadgesGenerator {...props} />);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render the fake component', () => {
		// Given
		const FakeComponent = ({ id }) => (
			<div data-testid="fake" data-id={id}>
				This is a fake component
			</div>
		);
		const props = {
			badges,
			badgesDictionary,
			getBadgeFromDict: () => FakeComponent,
			id: 'my-id',
			t: jest.fn(),
		};
		// When
		render(<BadgesGenerator {...props} />);
		// Then
		expect(screen.getByTestId('fake').dataset.id).toBe('name-ed8c6c4a-9025-4ba9-b382-620773ce2ee8');
	});
});
