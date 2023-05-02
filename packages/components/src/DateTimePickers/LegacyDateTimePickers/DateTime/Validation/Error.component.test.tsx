import { render, screen } from '@testing-library/react';

import Error from './Error.component';

describe('DateTime.Validation.Error', () => {
	it('should render', () => {
		// given
		const errors = [{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' }];

		// when
		render(<Error errors={errors} />);

		// then
		expect(screen.getByTestId('INVALID_DATE_FORMAT')).toBeInTheDocument();
	});

	it('should hide errors', () => {
		// given
		const errors = [{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' }];

		// when
		render(<Error errors={errors} hidden />);

		// then
		expect(screen.queryByTestId('INVALID_DATE_FORMAT')?.parentElement).toHaveClass('sr-only');
	});
});
