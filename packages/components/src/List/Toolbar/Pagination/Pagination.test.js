import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination.component';

const props = {
	id: 'pagination',
	startIndex: 11,
	totalResults: 25,
	itemsPerPage: 5,
	onChange: jest.fn(),
};

jest.unmock('@talend/design-system');

describe('Pagination', () => {
	it('should navigate to first page', () => {
		// given
		render(<Pagination {...props} />);
		// when
		userEvent.click(screen.getByLabelText('Go to first page.'));
		// then
		expect(props.onChange).toBeCalledWith(1, 5);
	});

	it('should navigate to previous page', () => {
		// given
		render(<Pagination {...props} />);
		// when
		userEvent.click(screen.getByLabelText('Go to previous page. Current page: 3.'));
		// then
		expect(props.onChange).toBeCalledWith(6, 5);
	});

	it('should navigate to next page', () => {
		// given
		render(<Pagination {...props} />);
		// when
		userEvent.click(screen.getByLabelText('Go to next page. Current page: 3.'));
		// then
		expect(props.onChange).toBeCalledWith(16, 5);
	});

	it('should navigate to last page', () => {
		// given
		render(<Pagination {...props} />);
		// when
		userEvent.click(screen.getByLabelText('Go to last page.'));
		// then
		expect(props.onChange).toBeCalledWith(21, 5);
	});
});
