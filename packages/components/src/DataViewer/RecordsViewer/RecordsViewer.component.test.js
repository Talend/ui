import { render, screen } from '@testing-library/react';
import Component from './RecordsViewer.component';

jest.unmock('@talend/design-system');

jest.mock('../Core', () => {
	return {
		Tree: props => <div data-testid="tree" data-props={JSON.stringify(props)}></div>,
	};
});
jest.mock('../Virtualized', () => {
	return {
		VirtualizedTree: props => (
			<div data-testid="virtualized-tree" data-props={JSON.stringify(props)}></div>
		),
	};
});

describe('RecordsViewer', () => {
	beforeEach(() => {
		jest.resetAllMocks();
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
