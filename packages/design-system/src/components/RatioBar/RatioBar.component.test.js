import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RatioBar } from './RatioBar.component';

describe('RatioBar', () => {
	describe('RatioBar component', () => {
		it('should render an empty bar', () => {
			// given
			const props = {
				amount: 0,
				total: 12,
			};
			// when
			const { container } = render(<RatioBar {...props} />);
			// then
			expect(container.firstChild).toMatchSnapshot();
			expect(screen.getByTestId('ratio-bar-counter')).toHaveTextContent('0/12');
			expect(screen.getByTestId('ratio-bar')).toBeVisible();
			expect(screen.getByTestId('ratio-bar-empty')).toBeVisible();
			expect(screen.getByTestId('ratio-bar-empty')).toHaveStyle('flex-basis: 100%');
		});

		it('should render a not applicable chart', () => {
			// given
			const props = {
				amount: null,
				total: 12,
			};
			// when
			render(<RatioBar {...props} />);
			// then
			expect(screen.getByTestId('ratio-bar-counter')).toHaveTextContent('N/A');
		});

		it('should render an full sized chart', async () => {
			const user = userEvent.setup();

			// given
			const props = {
				amount: 12,
				total: 12,
			};
			// when
			render(<RatioBar {...props} />);
			// then
			await user.tab();
			expect(screen.getByTestId('ratio-bar-counter')).toHaveTextContent('12/12');
			expect(screen.getByTestId('ratio-bar-filled')).toHaveStyle('flex-basis: 100%');
		});

		it('should render a classic ratio bar', () => {
			// given
			const props = {
				amount: 5,
				total: 12,
			};
			// when
			render(<RatioBar {...props} />);
			// then
			expect(screen.getByTestId('ratio-bar-filled')).toHaveStyle('flex-basis: 41.66666666666667%');
			expect(screen.getByTestId('ratio-bar-empty')).toHaveStyle('flex-basis: 58.33333333333333%');
			expect(screen.getByTestId('ratio-bar-counter')).toHaveTextContent('5/12');
		});
	});

	it('should render a classic ratio bar with errors', () => {
		// given
		const props = {
			amount: 5,
			total: 12,
			errors: 2,
		};
		// when
		render(<RatioBar {...props} />);
		// then
		expect(screen.getByTestId('ratio-bar-filled')).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(screen.getByTestId('ratio-bar-empty')).toHaveStyle('flex-basis: 41.666666666666664%');
		expect(screen.getByTestId('ratio-bar-error')).toHaveStyle('flex-basis: 16.666666666666664%');
		expect(screen.getByTestId('ratio-bar-counter')).toHaveTextContent('7/12');
	});

	it('should render a classic ratio bar without label', () => {
		// given
		const props = {
			amount: 5,
			total: 12,
		};
		// when
		render(<RatioBar {...props} hideLabel />);
		screen;
		// then
		expect(screen.getByTestId('ratio-bar-filled')).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(screen.getByTestId('ratio-bar-empty')).toHaveStyle('flex-basis: 58.33333333333333%');
		expect(screen.queryByTestId('ratio-bar-counter')).not.toBeInTheDocument();
	});
});
