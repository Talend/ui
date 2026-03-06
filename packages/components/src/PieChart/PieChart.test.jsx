/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PieChart from './PieChart.component';
vi.mock('../TooltipTrigger', () => {
	const TooltipTrigger = ({ children, ...props }) => (
		<div data-testid="TooltipTrigger" data-props={JSON.stringify(props)}>
			{children}
		</div>
	);
	TooltipTrigger.propTypes = {};
	return { default: TooltipTrigger };
});
vi.mock('../OverlayTrigger', () => {
	const OverlayTrigger = ({ children, ...props }) => (
		<div data-testid="OverlayTrigger" data-props={JSON.stringify(props)}>
			{children}
		</div>
	);
	OverlayTrigger.propTypes = {};
	return { default: OverlayTrigger };
});

describe('PieChart', () => {
	it('should render a PieChartButton', () => {
		const { container } = render(<PieChart onClick={jest.fn()} />);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('button')).toBeVisible();
	});
	it('should render a PieChartIcon', () => {
		render(<PieChart label="myIcon" />);
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
		const svg = document.querySelector('svg');
		expect(svg).toBeVisible();
	});
	it('should render a PieChart with a tooltip', async () => {
		render(<PieChart label="myTooltip" tooltip />);
		expect(screen.getByTestId('TooltipTrigger')).toBeVisible();
	});
});
