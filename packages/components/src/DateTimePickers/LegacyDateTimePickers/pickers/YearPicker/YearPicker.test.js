import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dateMock from '../../../../../../../mocks/dateMock';

import YearPicker from './YearPicker.component';

describe('YearPicker', () => {
	afterEach(() => {
		dateMock.restore();
	});

	it('should render', () => {
		// given
		dateMock.mock(new Date(2015, 11, 31));

		// when
		const { container } = render(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should default render with current year in middle when "selectedYear" prop is not provided', () => {
		// given
		dateMock.mock(new Date(2025, 1, 20));

		// when
		render(<YearPicker onSelect={jest.fn()} />);

		// then
		expect(screen.getByText('2025')).toBeVisible();
		const buttons = screen
			.getAllByRole('button')
			.filter(b => b.className.includes('tc-date-picker-year'));
		expect(buttons.length).toBe(7);
		expect(buttons[3]).toHaveTextContent('2025');
	});

	it('should callback with the year picked', () => {
		// given
		const firstSelectableYear = 2011;
		const selectedYear = 2014;
		const onSelect = jest.fn();
		render(<YearPicker selectedYear={selectedYear} onSelect={onSelect} />);
		expect(onSelect).not.toBeCalled();

		// when
		userEvent.click(screen.getByText('2011'));

		expect(onSelect).toBeCalledWith(expect.anything(), firstSelectableYear);
	});

	it('should scroll up by 1 year', () => {
		// given
		render(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(screen.getAllByRole('button')[0]).toHaveTextContent('2009');

		// when
		userEvent.click(screen.getByLabelText('Go to previous year'));

		// then
		expect(screen.getAllByRole('button')[0]).toHaveTextContent('2008');
	});

	it('should scroll down by 1 year', () => {
		// given
		render(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(screen.getAllByRole('button')[6]).toHaveTextContent('2015');

		// when
		userEvent.click(screen.getByLabelText('Go to next year'));

		// then
		expect(screen.getAllByRole('button')[6]).toHaveTextContent('2016');
	});
});
