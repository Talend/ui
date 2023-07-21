/* eslint-disable react/display-name */
import { screen, render } from '@testing-library/react';
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
		render(<HeaderTitle monthIndex={8} year={2012} button={{ 'data-foo': 'whateverValue' }} />);

		// Then
		const btn = screen.getByRole('button');
		expect(btn).toBeVisible();
		expect(btn).toHaveAttribute('aria-label', 'September 2012');
		expect(btn).toHaveAttribute('data-foo', 'whateverValue');
		expect(btn).toHaveTextContent('September 2012');
	});
});
