import React from 'react';
import { mount } from 'enzyme';
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
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeDate {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.find('button#myId-badge-date-action-overlay').text()).toEqual('2011-10-01');
	});
});
