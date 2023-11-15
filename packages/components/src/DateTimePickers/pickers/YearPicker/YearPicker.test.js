import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YearPicker from './YearPicker.component';
import dateMock from '../../../../../../mocks/dateMock';

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
		const btns = screen.getAllByRole('button');
		const currentbtn = screen.getByText('2025');
		expect(currentbtn).toBeVisible();
		expect(btns.length).toBe(7);
		expect(btns[3]).toBe(currentbtn);
	});

	it('should callback with the year picked', () => {
		// given
		const firstSelectableYear = 2011;
		const selectedYear = 2014;
		const onSelect = jest.fn();
		render(<YearPicker selectedYear={selectedYear} onSelect={onSelect} />);
		expect(onSelect).not.toHaveBeenCalled();

		// when
		userEvent.click(screen.getByText(firstSelectableYear));

		expect(onSelect).toHaveBeenCalledWith(expect.anything({ type: 'click' }), firstSelectableYear);
	});

	it('should scroll up by 1 year', () => {
		// given
		render(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(screen.getByText('2009')).toBeVisible();
		expect(screen.getAllByRole('button')[0]).toHaveTextContent('2009');

		// when
		userEvent.click(screen.getByLabelText('Go to previous year'));

		// then
		expect(screen.getAllByRole('button')[0]).toHaveTextContent('2008');
	});

	it('should scroll down by 1 year', () => {
		// given
		render(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);

		// when
		userEvent.click(screen.getByLabelText('Go to next year'));

		// then
		expect(screen.getAllByRole('button')[0]).toHaveTextContent('2010');
	});
});
