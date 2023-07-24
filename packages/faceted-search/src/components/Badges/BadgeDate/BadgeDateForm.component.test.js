import { render, fireEvent } from '@testing-library/react';
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
