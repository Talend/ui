import { render, screen } from '@testing-library/react';
import HeaderTitle from './HeaderTitle.component';

describe('HeaderTitle', () => {
	it('should render', () => {
		// When
		const { container } = render(
			<HeaderTitle monthIndex={8} year={2012} onSelectYear={jest.fn()} />,
		);

		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render a button', () => {
		// When
		render(
			<HeaderTitle
				monthIndex={8}
				year={2012}
				button={{ whateverButtonProp: 'whateverValue' }}
				onSelectYear={jest.fn()}
			/>,
		);

		// Then
		expect(screen.getByRole('button')).toBeVisible();
		expect(screen.getByRole('button')).toHaveTextContent('2012');
		expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'September 2012');
	});

	it('should render the correct date and format', () => {
		const { rerender } = render(
			<HeaderTitle monthIndex={2} year={2001} onSelectYear={jest.fn()} />,
		);
		expect(screen.getByText('March')).toBeVisible();
		expect(screen.getByText('2001')).toBeVisible();
		rerender(
			<HeaderTitle
				monthIndex={11}
				year={2002}
				button={{ whateverButtonProp: 'whateverValue' }}
				onSelectYear={jest.fn()}
			/>,
		);
		expect(screen.getByLabelText('December 2002')).toBeVisible();
	});
});
