/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';

import HeaderTitle from './HeaderTitle.component';

jest.mock('../../pickers/YearPicker', () => props => (
	<div data-testid="YearPicker" data-props={JSON.stringify(props)} />
));

describe('HeaderTitle', () => {
	it('should render a span and ActionDropdown', () => {
		// When
		const { container } = render(<HeaderTitle monthIndex={8} year={2012} />);

		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render a button', () => {
		// When
		render(
			<HeaderTitle
				monthIndex={8}
				year={2012}
				button={{ 'data-foo': 'whateverValue', 'data-testid': 'whateverButton' }}
			/>,
		);

		// Then
		const yearBtn = screen.getByRole('button');
		expect(yearBtn).toBeVisible();
		expect(yearBtn).toHaveAttribute('aria-label', '2012');

		const monthBtn = screen.getByTestId('whateverButton');
		expect(monthBtn).toBeVisible();
		expect(monthBtn).toHaveAttribute('data-foo', 'whateverValue');
		expect(monthBtn).toHaveTextContent('September');
	});
});
