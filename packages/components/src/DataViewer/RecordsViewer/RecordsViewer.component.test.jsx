import { render, screen } from '@testing-library/react';
import Component from './RecordsViewer.component';

vi.mock('../Core', () => {
	return {
		Tree: props => <div data-testid="tree" data-props={JSON.stringify(props)}></div>,
	};
});
vi.mock('../Virtualized', () => {
	return {
		VirtualizedTree: props => (
			<div data-testid="virtualized-tree" data-props={JSON.stringify(props)}></div>
		),
	};
});

describe('RecordsViewer', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});
	it('should render a tree virtualized with a header', () => {
		const { container } = render(
			<Component disableHeight value={['one', 'two']} onCollapseAll={jest.fn()} />,
		);
		// header
		expect(screen.getByText('Records')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render a tree (not virtualized) ', () => {
		const { container } = render(
			<Component
				onCollapseAll={jest.fn()}
				disableHeight
				value={[{ data: 'myData' }]}
				virtualized={false}
			/>,
		);
		expect(screen.getByText('Records')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
});
