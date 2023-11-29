import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TooltipTrigger from './TooltipTrigger.component';

describe('ActionTooltip', () => {
	it('should render only the children', async () => {
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

		// then
		expect(await screen.findByText('Action')).toBeVisible();
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

		// then
		expect(await screen.findByText('toto')).toBeVisible();
	});

	it('should render custom tooltip when focus the children', async () => {
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

		// then
		expect(await screen.findByText('a custom tooltip')).toBeVisible();
	});
});
