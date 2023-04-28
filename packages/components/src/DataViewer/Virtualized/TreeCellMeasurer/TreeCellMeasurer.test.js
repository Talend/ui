/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import TreeCellMeasurer from './TreeCellMeasurer.component';
import { CellMeasurerCache, measure } from 'react-virtualized';

jest.mock('react-virtualized', () => {
	const mod = jest.requireActual('react-virtualized');
	// eslint-disable-next-line @typescript-eslint/no-shadow
	const measure = jest.fn();
	return {
		...mod,
		CellMeasurer: props => (
			<div data-testid="CellMeasurer" data-props={JSON.stringify(props, null, 2)}>
				{props.children({ measure })}
			</div>
		),
		measure,
	};
});

describe('TreeCellMeasurer', () => {
	it('it should render my cell renderer', () => {
		const cellRenderer = props => (
			<div data-test="cellRenderer" data-index={props.index} data-measure={props.measure()}>
				MyCellRenderer
			</div>
		);
		const parent = {
			props: {
				cache: new CellMeasurerCache({}),
				paddingOffset: 30,
			},
		};
		const props = {
			parent,
			index: 0,
			style: { padding: 0 },
			cellRenderer,
		};
		render(<TreeCellMeasurer {...props} />);
		expect(screen.getByText('MyCellRenderer')).toBeInTheDocument();
		expect(screen.getByTestId('CellMeasurer')).toBeInTheDocument();
		expect(screen.getByTestId('CellMeasurer').dataset.props).toMatchSnapshot();
		expect(measure).toHaveBeenCalled();
	});
});
