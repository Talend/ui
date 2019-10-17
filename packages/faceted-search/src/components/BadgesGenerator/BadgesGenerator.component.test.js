/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';

import { BadgesGenerator } from './BadgesGenerator.component';

describe('BadgesGenerator', () => {
	const badges = [
		{
			properties: {
				name: 'name',
				category: 'name',
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

	it('should render the html output', () => {
		// Given
		const props = {
			badges,
			getBadge: jest.fn(),
			id: 'my-id',
			t: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgesGenerator {...props} />);
		// Then
		expect(wrapper.html()).toBe(null);
	});
	it('should render the fake component', () => {
		// Given
		const FakeComponent = props => <div {...props}>This is a fake component</div>;
		const props = {
			badges,
			getBadge: () => FakeComponent,
			id: 'my-id',
			t: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgesGenerator {...props} />);
		// Then
		expect(wrapper.find('div#name-ed8c6c4a-9025-4ba9-b382-620773ce2ee8').text()).toEqual(
			'This is a fake component',
		);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
