import { fireEvent, render } from '@testing-library/react';

import getDefaultT from '../../../translate';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import { BadgeDateForm } from './BadgeDateForm.component';

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
			value: new Date('2011-11-11T00:00:00'),
			feature: 'data',
			t: getDefaultT(),
		};

		// When
		const { container } = render(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeDateForm {...props} />
			</BadgeFacetedProvider>,
		);

		fireEvent.click(document.querySelector('button[data-value="18"]'));
		fireEvent.submit(document.querySelector('button[type="submit"]'));

		expect(onChange).toHaveBeenCalledWith(
			expect.anything(),
			new Date('2011-11-18T00:00:00').getTime(),
		);
		expect(onSubmit).toHaveBeenCalled();
		expect(container.firstChild).toMatchSnapshot();
	});
});
