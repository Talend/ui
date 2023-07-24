/* eslint-disable react/prop-types */
import { screen, render, fireEvent } from '@testing-library/react';
import { TimeRangeHandler, TimeInputField } from './TimeRangeHandler';

const H11_11_11_IN_SECS = 11 * 3600 + 11 * 60 + 11;

jest.mock('@talend/react-components', () => ({
	InputTimePicker: ({ onChange }) => (
		<div data-testid="InputTimePicker">
			<button
				onClick={e =>
					onChange(e, {
						origin: 'PICKER',
						textInput: '11:11:11',
					})
				}
			>
				InputTimePicker.onChange
			</button>
		</div>
	),
}));

describe('TimeRangeHandler', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		render(<TimeInputField id="" value={9845} onChange={onChange} />);
		fireEvent.click(screen.getByText('InputTimePicker.onChange'));

		expect(onChange).toHaveBeenCalledWith(H11_11_11_IN_SECS);
	});

	it('Should create ticks', () => {
		const ticks = TimeRangeHandler.getTicks({
			min: H11_11_11_IN_SECS,
			max: H11_11_11_IN_SECS + 3600 * 4,
		});
		expect(ticks).toEqual({
			'40271': '11:11:11',
			'45000': '12:30:00',
			'50000': '13:53:20',
			'54671': '15:11:11',
		});
	});
});
