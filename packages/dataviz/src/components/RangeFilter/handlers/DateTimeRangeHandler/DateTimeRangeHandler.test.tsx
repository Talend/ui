/* eslint-disable react/prop-types */
import { screen, render, fireEvent } from '@testing-library/react';
import { DateTimeInputField, DateTimeRangeHandler } from './DateTimeRangeHandler';
import { DateRangeHandler } from '../DateRangeHandler/DateRangeHandler';

jest.mock('@talend/react-components', () => ({
	InputDateTimePicker: ({ onChange, useSeconds, ...props }) => (
		<div data-testid="InputDateTimePicker">
			<button
				onClick={() =>
					onChange(
						{},
						{
							textInput: '2015-01-01 02:00:00',
						},
					)
				}
			>
				InputDateTimePicker.onChange 1
			</button>
			<button onClick={() => onChange({}, { textInput: '2010-24-24 02:00:00' })}>
				InputDateTimePicker.onChange invalid
			</button>
			<input {...props} onChange={() => {}} />
		</div>
	),
}));

describe('DateTimeRangeHandler', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		render(<DateTimeInputField id="" value={1262300400000} onChange={onChange} />);
		fireEvent.click(screen.getByText('InputDateTimePicker.onChange 1'));
		expect(onChange).not.toHaveBeenCalled();
		fireEvent.blur(screen.getByRole('textbox'));
		expect(onChange).toHaveBeenCalledWith(new Date('2015-01-01T02:00:00').getTime());
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		render(<DateTimeInputField id="" value={1262300400000} onChange={onChange} />);

		fireEvent.click(screen.getByText('InputDateTimePicker.onChange 1'));
		fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

		expect(screen.getByRole('textbox')).toHaveValue('2009-12-31 23:00:00');
	});

	it('Should reset value on blur with invalid input', () => {
		const onChange = jest.fn();
		render(
			<DateTimeInputField
				id=""
				value={new Date('2010-01-01T02:00:00').getTime()}
				onChange={onChange}
			/>,
		);

		fireEvent.click(screen.getByText('InputDateTimePicker.onChange invalid'));
		fireEvent.blur(screen.getByRole('textbox'));

		expect(screen.getByRole('textbox')).toHaveValue('2010-01-01 02:00:00');
	});

	it('Should set min value to current timezone second start', () => {
		const min = DateTimeRangeHandler.getMinValue(
			new Date('2015-01-01T12:01T12:01T12.200').getTime(),
		);
		expect(min).toEqual(new Date('2015-01-01T12:01T12:01T12.000').getTime());
	});

	it('Should set max value to current timezone second end', () => {
		const max = DateTimeRangeHandler.getMaxValue(new Date('2015-01-01T12:12:12.000').getTime());
		expect(max).toEqual(new Date('2015-01-01T12:12:12.999').getTime());
	});

	it('Should create ticks', () => {
		const limits = {
			min: new Date('2000-01-01T12:00:00').getTime(),
			max: new Date('2030-01-01T12:00:00').getTime(),
		};
		const ticks = DateRangeHandler.getTicks(limits);
		expect(ticks).toEqual({
			[limits.min]: '2000-01-01',
			'1262304000000': '2010-01-01',
			'1577836800000': '2020-01-01',
			[limits.max]: '2030-01-01',
		});
	});
});
