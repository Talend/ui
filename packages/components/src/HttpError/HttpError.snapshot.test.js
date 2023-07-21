import { render, screen } from '@testing-library/react';

import HttpError from './HttpError.component';

const forbiddenProps = {
	status: 403,
	title: 'Access denied',
	message: 'You are not allowed to access this page',
};

const notFoundProps = {
	status: 404,
	title: 'Oops...',
	message: 'The page you are looking for cannot be found',
	action: {
		onClick: jest.fn(),
		label: 'Start over',
	},
};

describe('HttpError', () => {
	it('should render a forbidden http error message', () => {
		// when
		const { container } = render(<HttpError {...forbiddenProps} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render a notFound http error page with action', () => {
		// when
		render(<HttpError {...notFoundProps} />);

		// then
		const element = screen.getByRole('link');
		expect(element).toBeVisible();
		expect(element).toHaveTextContent(notFoundProps.action.label);
	});
});
