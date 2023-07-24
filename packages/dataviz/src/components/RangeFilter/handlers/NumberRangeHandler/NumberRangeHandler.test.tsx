import { screen, render, fireEvent } from '@testing-library/react';
import { NumberInputField, NumberRangeHandler } from './NumberRangeHandler';

describe('Number input field', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		render(<NumberInputField id="" value={10} onChange={onChange} />);

		fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '20' } });
		expect(onChange).not.toHaveBeenCalled();

		fireEvent.blur(screen.getByRole('spinbutton'));
		expect(onChange).toHaveBeenCalledWith(20);
	});

	it('Should not trigger onChange if value did not change', () => {
		const onChange = jest.fn();
		render(<NumberInputField id="" value={10} onChange={onChange} />);
		fireEvent.blur(screen.getByRole('spinbutton'));
		expect(onChange).not.toHaveBeenCalled();
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		render(<NumberInputField id="" value={10} onChange={onChange} />);

		fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '20' } });
		fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'Escape' });

		expect(screen.getByRole('spinbutton')).toHaveValue(10);
	});

	it('Should submit value on Enter', () => {
		const onChange = jest.fn();
		render(<NumberInputField id="" value={10} onChange={onChange} />);

		fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '20' } });
		fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'Enter' });

		expect(onChange).toHaveBeenCalledWith(20);
	});
	it('Should create ticks', () => {
		const ticks = NumberRangeHandler.getTicks({
			min: 2177.87,
			max: 9530.28,
		});

		expect(ticks).toEqual({
			'2177.87': '2,177.87',
			'4000': '4,000',
			'6000': '6,000',
			'8000': '8,000',
			'9530.28': '9,530.28',
		});
	});
	it('Should create ticks for big number', () => {
		const ticks = NumberRangeHandler.getTicks({
			min: 131035911,
			max: 831035920,
		});

		expect(ticks).toEqual({
			'131035911': '131,035,911',
			'500000000': '500,000,000',
			'831035920': '831,035,920',
		});
	});
});
