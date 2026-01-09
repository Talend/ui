/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MonthYearView from './MonthYearView.component';

jest.mock('../../pickers/MonthPicker', () => props => (
	<div data-testid="MonthPicker" data-props={JSON.stringify(props)} />
));
jest.mock('../HeaderTitle', () => props => (
	<div data-testid="HeaderTitle" data-props={JSON.stringify(props)} />
));
jest.unmock('@talend/design-system');
describe('MonthYearView', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<MonthYearView
				allowFocus
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should manage tabIndex', () => {
		// given
		const { rerender } = render(
			<MonthYearView
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);
		expect(screen.getByLabelText('Switch to date-and-time view')).toHaveAttribute('tabIndex', '-1');

		// when
		rerender(
			<MonthYearView
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
				allowFocus
			/>,
		);

		// then
		expect(screen.getByLabelText('Switch to date-and-time view')).toHaveAttribute('tabIndex', '0');
	});

	it('should trigger props.onBackClick', async () => {
		const user = userEvent.setup();

		// given
		const onBackClick = jest.fn();
		render(
			<MonthYearView
				onBackClick={onBackClick}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);
		expect(onBackClick).not.toHaveBeenCalled();

		// when
		await user.click(screen.getByLabelText('Switch to date-and-time view'));

		// then
		expect(onBackClick).toHaveBeenCalledWith(expect.anything({ type: 'click' }), expect.anything());
	});
});
