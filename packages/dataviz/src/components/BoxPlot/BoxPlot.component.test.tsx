import { render } from '@testing-library/react';
import Boxplot from './BoxPlot.component';

describe('Boxplot chart', () => {
	it('should render the different basic components of the boxplot', () => {
		const { container } = render(
			<Boxplot
				boxPlotData={{
					min: 0,
					max: 100,
					q1: 8,
					q2: 90,
					median: 58,
					mean: 59.79,
				}}
				id="boxplotId"
				width={200}
				height={400}
			/>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
