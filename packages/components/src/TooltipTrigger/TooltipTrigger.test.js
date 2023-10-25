import { act } from 'react-dom/test-utils';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TooltipTrigger from './TooltipTrigger.component';

function runAllTimers() {
	act(() => {
		jest.runAllTimers();
	});
}

describe('ActionTooltip', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.useRealTimers();
	});

	it('should render only the children', () => {
		// given
		const props = {
			label: 'toto',
			tooltipPlacement: 'right',
			tooltipDelay: 10,
		};

		// when
		render(
			<div>
				<TooltipTrigger {...props}>
					<div>Action</div>
				</TooltipTrigger>
			</div>,
		);
		runAllTimers();
		// then
		expect(screen.getByText('Action')).toBeVisible();
		expect(screen.queryByText('toto')).not.toBeInTheDocument();
	});

	it('should render tooltip when focus the children', async () => {
		// given
		const props = {
			label: 'toto',
			tooltipPlacement: 'right',
			tooltipDelay: 10,
		};

		// when
		render(
			<TooltipTrigger {...props}>
				<button data-testid="children">Action</button>
			</TooltipTrigger>,
		);

		await userEvent.hover(screen.getByText('Action'));
		runAllTimers();

		// then
		expect(await screen.findByText('toto')).toBeVisible();
	});

	it('should render custom tooltip when focus the children', () => {
		// given
		const props = {
			label: <div>a custom tooltip</div>,
			tooltipPlacement: 'right',
			tooltipDelay: 10,
		};

		// when
		render(
			<TooltipTrigger {...props}>
				<button>Action</button>
			</TooltipTrigger>,
		);
		screen.getByText('Action').focus();
		runAllTimers();

		// then
		expect(screen.getByText('a custom tooltip')).toBeVisible();
	});
});
