/* eslint-disable testing-library/prefer-screen-queries */
import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RatioBar } from './RatioBar.component';

describe('RatioBar', () => {
	it('should render an empty bar', () => {
		const props = { amount: 0, total: 12 };

		const { getByTestId } = render(<RatioBar {...props} />);

		expect(getByTestId('rationBar')).toBeVisible();
		expect(getByTestId('ratioBarEmpty')).toBeVisible();
		expect(getByTestId('ratioBarEmpty')).toHaveStyle('flex-basis: 100%');
	});

	it('should render a not applicable chart', () => {
		const props = { total: 12 };

		const { getByTestId } = render(<RatioBar {...props} />);

		expect(getByTestId('ratioBarCounterNA')).toBeInTheDocument();
	});

	it('should render an full sized chart', async () => {
		const user = userEvent.setup();
		const props = { amount: 12, total: 12 };

		const { getByTestId } = render(<RatioBar {...props} />);
		await user.tab();

		expect(getByTestId('ratioBarCounter')).toHaveTextContent('12/12');
		expect(getByTestId('ratioBarFilled')).toHaveStyle('flex-basis: 100%');
	});

	it('should render a classic ratio bar', () => {
		const props = { amount: 5, total: 12 };

		const { getByTestId } = render(<RatioBar {...props} />);

		expect(getByTestId('ratioBarFilled')).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(getByTestId('ratioBarEmpty')).toHaveStyle('flex-basis: 58.33333333333333%');
		expect(getByTestId('ratioBarCounter')).toHaveTextContent('5/12');
	});

	it('should render a classic ratio bar with errors', () => {
		const props = { amount: 5, total: 12, errors: 2 };

		const { getByTestId } = render(<RatioBar {...props} />);

		expect(getByTestId('ratioBarFilled')).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(getByTestId('ratioBarEmpty')).toHaveStyle('flex-basis: 41.666666666666664%');
		expect(getByTestId('ratioBarError')).toHaveStyle('flex-basis: 16.666666666666664%');
		expect(getByTestId('ratioBarCounter')).toHaveTextContent('7/12');
	});

	it('should render a classic ratio bar without label', () => {
		const props = { amount: 5, total: 12 };

		const { getByTestId, queryByTestId } = render(<RatioBar {...props} hideLabel />);

		expect(getByTestId('ratioBarFilled')).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(getByTestId('ratioBarEmpty')).toHaveStyle('flex-basis: 58.33333333333333%');
		expect(queryByTestId('ratioBarCounter')).not.toBeInTheDocument();
	});
});
