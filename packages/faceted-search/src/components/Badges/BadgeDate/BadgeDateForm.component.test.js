import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { BadgeDateForm } from './BadgeDateForm.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeDateForm', () => {
	it('should mount a badge and change date', () => {
		// Given
		const onSubmit = jest.fn();
		const onChange = jest.fn();
		const props = {
			id: 'customId',
			onSubmit,
			onChange,
			value: '2011-11-11',
			feature: 'data',
			t: getDefaultT(),
		};

		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeDateForm {...props} />
			</BadgeFacetedProvider>,
		);

		wrapper.find('button[data-value=18]').simulate('click');
		wrapper.find('button[type="submit"]').simulate('submit');

		expect(onChange).toHaveBeenCalledWith(expect.anything(), new Date('2011-11-18T00:00:00').getTime());
		expect(onSubmit).toHaveBeenCalled();
	});
});
