import { render, screen } from '@testing-library/react';

import VirtualizedTree from './VirtualizedTree.component';
// eslint-disable-next-line react/display-name
jest.mock('../TreeCellMeasurer', () => props => (
	<div data-testid="TreeCellMeasurer" data-props={JSON.stringify(props)}>
		props.cellRenderer()
	</div>
));

jest.mock('react-virtualized', () => {
	const mod = jest.requireActual('react-virtualized');
	return {
		...mod,
		// eslint-disable-next-line react/prop-types
		AutoSizer: ({ disableHeight, children }) => (
			<div data-testid="AutoSizer" data-disableheight={disableHeight}>
				{children({ height: 100, width: 100 })}
			</div>
		),
		List: props => <div data-testid="List" data-props={JSON.stringify(props, null, 2)} />,
	};
});

describe('VirtualizedTree', () => {
	it('should render the autosize from react virtualized', () => {
		const cellRenderer = () => <div>MyCellRenderer</div>;
		render(<VirtualizedTree rowCount={10} cellRenderer={cellRenderer} disableHeight />);
		expect(screen.getByTestId('AutoSizer')).toBeVisible();
		expect(screen.getByTestId('AutoSizer').dataset.disableheight).toBe('true');
		expect(screen.getByTestId('List')).toBeVisible();
		expect(JSON.parse(screen.getByTestId('List').dataset.props)).toMatchSnapshot();
	});
});
