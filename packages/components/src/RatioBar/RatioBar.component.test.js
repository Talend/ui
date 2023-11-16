import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RatioBar } from './RatioBar.component';

// as this is SVG we need to rely on custom selector
function getCounter() {
	return document.querySelector('.tc-ratio-bar-counter');
}
function getRatioBar() {
	return document.querySelector('.tc-ratio-bar');
}
function getRatioBarLine() {
	return document.querySelector('.tc-ratio-bar-line');
}
function getEmptyLine() {
	return document.querySelector('.tc-ratio-bar-line-empty');
}
function getErrorLine() {
	return document.querySelector('.tc-ratio-bar-line-error');
}
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
			expect(getCounter()).toHaveTextContent('0/12');
			expect(getRatioBar()).toBeVisible();
			expect(getEmptyLine()).toBeVisible();
			expect(getEmptyLine()).toHaveStyle('flex-basis: 100%');
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
			expect(getCounter()).toHaveTextContent('N/A');
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
			expect(getCounter()).toHaveTextContent('12/12');
			expect(getRatioBarLine()).toHaveStyle('flex-basis: 100%');
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
			expect(getRatioBarLine()).toHaveStyle('flex-basis: 41.66666666666667%');
			expect(getEmptyLine()).toHaveStyle('flex-basis: 58.33333333333333%');
			expect(getCounter()).toHaveTextContent('5/12');
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
		expect(getRatioBarLine()).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(getEmptyLine()).toHaveStyle('flex-basis: 41.666666666666664%');
		expect(getErrorLine()).toHaveStyle('flex-basis: 16.666666666666664%');
		expect(getCounter()).toHaveTextContent('7/12');
	});

	it('should render a classic ratio bar without label', () => {
		// given
		const props = {
			amount: 5,
			total: 12,
		};
		// when
		render(<RatioBar {...props} hideLabel />);
		// then
		expect(getRatioBarLine()).toHaveStyle('flex-basis: 41.66666666666667%');
		expect(getEmptyLine()).toHaveStyle('flex-basis: 58.33333333333333%');
		expect(getCounter()).not.toBeInTheDocument();
	});
});
