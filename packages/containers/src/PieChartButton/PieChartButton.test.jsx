import Immutable from 'immutable';
import { screen, render } from '@testing-library/react';
import Connected, { ContainerPieChartButton } from './PieChartButton.connect';

describe('PieChartButton connected', () => {
	it('should connect filter', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerPieChartButton.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerPieChartButton);
	});
});

describe('PieChartButton container', () => {
	it('should render', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
			],
		});
		const { container } = render(<ContainerPieChartButton state={initialState} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render not available pie chart button', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
			],
			available: false,
		});
		const { container } = render(<ContainerPieChartButton state={initialState} />);
		expect(container).toBeEmptyDOMElement();
	});

	it('should render loading pie chart button', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
			],
			loading: true,
		});
		render(<ContainerPieChartButton state={initialState} />);
		expect(screen.getByLabelText('Loading chart')).toBeVisible();
		expect(screen.getByLabelText('Loading chart')).toHaveAttribute('aria-busy', 'true');
	});
});
