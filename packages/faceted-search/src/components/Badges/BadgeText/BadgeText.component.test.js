import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
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
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeText {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
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
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeText {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(
			wrapper
				.find('#potatoId-badge-text-action-overlay')
				.first()
				.text(),
		).toEqual('init value');
	});
});
