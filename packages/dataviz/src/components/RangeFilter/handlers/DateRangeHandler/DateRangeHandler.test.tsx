/* eslint-disable react/prop-types */
import { render, fireEvent, screen } from '@testing-library/react';
import parseISO from 'date-fns/parseISO';
import { DateInputField, DateRangeHandler } from './DateRangeHandler';

jest.unmock('@talend/design-system');

jest.mock('@talend/react-components', () => ({
	// ...jest.requireActual('@talend/react-components'),
	InputDatePicker: ({ onChange, onBlur, onKeyDown, ...props }) => (
		<div data-testid="InputDatePicker" {...props}>
			<button
				onClick={e =>
					onChange(e, {
						origin: 'PICKER',
						textInput: '2015-01-01',
					})
				}
			>
				InputDatePicker.onChange
			</button>
			<button
				onClick={e =>
					onChange(e, {
						origin: 'PICKER',
						textInput: '2015-24-24',
					})
				}
			>
				InputDatePicker.onChange wrong
			</button>
			<button onClick={() => onBlur({} as any)}>InputDatePicker.onBlur</button>
			<button onClick={() => onKeyDown({ key: 'Escape' } as any)}>InputDatePicker.onKeyDown</button>
			<button onClick={() => onKeyDown({ key: 'Enter' } as any)}>InputDatePicker.onKeyDown</button>
			<input
				data-testid="datepicker"
				type="text"
				value={props.value}
				onChange={e => onChange(e, props.testData)}
			/>
		</div>
	),
}));

describe('DateRangeHandler', () => {
	it('should render a InputDatePicker', () => {
		const { container } = render(
			<DateInputField id="myId" value={1262300400000} onChange={jest.fn()} onBlur={jest.fn()} />,
		);
		expect(container.firstChild).toHaveAttribute('data-testid', 'InputDatePicker');
	});
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		render(<DateInputField id="" value={1262300400000} onChange={onChange} />);
		// fireEvent.focus(screen.getByRole('textbox'));
		fireEvent.click(screen.getByText('InputDatePicker.onChange'));
		expect(onChange).toHaveBeenCalledWith(parseISO('2015-01-01').getTime());
	});

	it('Should reset value on blur with invalid input', () => {
		const onChange = jest.fn();
		render(<DateInputField id="" value={1262300400000} onChange={onChange} />);
		fireEvent.click(screen.getByText('InputDatePicker.onChange wrong'));
		expect(screen.getByRole('textbox')).toHaveValue('2015-24-24');
		expect(onChange).not.toHaveBeenCalled();
	});

	it('Should set min value to current timezone day start', () => {
		const min = DateRangeHandler.getMinValue(parseISO('2015-01-01T12:00:00').getTime());
		expect(min).toEqual(parseISO('2015-01-01T00:00:00.000').getTime());
	});

	it('Should set max value to current timezone day end', () => {
		const max = DateRangeHandler.getMaxValue(new Date('2015-01-01T12:00:00').getTime());
		expect(max).toEqual(parseISO('2015-01-01T23:59:59.999').getTime());
	});

	it('Should create ticks', () => {
		const limits = {
			min: new Date('2000-01-01T12:00:00').getTime(),
			max: new Date('2030-01-01T12:00:00').getTime(),
		};
		const ticks = DateRangeHandler.getTicks(limits);
		expect(ticks).toEqual({
			[limits.min]: '2000-01-01',
			'1262300400000': '2010-01-01',
			'1577833200000': '2020-01-01',
			[limits.max]: '2030-01-01',
		});
	});
	it('Should create ticks for tiny range', () => {
		const limits = {
			min: new Date('2000-01-01T12:00:00').getTime(),
			max: new Date('2000-01-02T12:00:00').getTime(),
		};
		const ticks = DateRangeHandler.getTicks(limits);
		expect(ticks).toEqual({
			[limits.min]: '2000-01-01',
			[limits.max]: '2000-01-02',
		});
	});
	it('Should have min/max even for single day range', () => {
		const limits = {
			min: new Date('2020-01-01T00:00:00').getTime(),
			max: new Date('2020-01-01T23:59:59').getTime(),
		};
		const ticks = DateRangeHandler.getTicks(limits);
		expect(ticks).toEqual({
			[limits.min]: '2020-01-01',
			[limits.max]: '2020-01-01',
		});
	});
});
