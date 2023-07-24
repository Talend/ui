import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MonthPicker from './MonthPicker.component';

describe('MonthPicker', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} selectedYear={2018} />,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should highlight selected month', () => {
		// when
		render(<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} />);

		// then
		expect(screen.getByText('May')).toHaveClass('theme-selected');
	});

	it('should trigger props.onSelect on selection', () => {
		// given
		const onSelect = jest.fn();
		render(<MonthPicker onSelect={onSelect} />);

		// when
		userEvent.click(screen.getByText('May'));

		// then
		expect(onSelect).toBeCalledWith(expect.anything(), 4);
	});

	it('should manage tabIndex', () => {
		// given
		const { rerender } = render(<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} />);
		expect(screen.getByText('May')).toHaveAttribute('tabIndex', '-1');

		// when
		rerender(<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} allowFocus />);

		// then
		expect(screen.getByText('May')).toHaveAttribute('tabIndex', '0');
	});
});
