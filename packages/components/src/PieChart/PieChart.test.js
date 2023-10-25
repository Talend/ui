/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import PieChart from './PieChart.component';

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
