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
	let treeProps = {
		// branch: jest.fn(() => <div data-testid="branch"></div>),
		// leaf: jest.fn(prop => <span data-testid="leaf" data-level={prop.level}></span>),
		// getValueType: jest.fn(() => 'integer'),
		// getItemType: jest.fn(item => {
		// 	if (Array.isArray(item)) {
		// 		return 'array';
		// 	}
		// 	if (item instanceof Object) {
		// 		return 'object';
		// 	}
		// 	return;
		// }),
		// getJSONPath: jest.fn(() => '$'),
	};
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should render a tree virtualized with a header', () => {
		const { container } = render(
			<Component disableHeight value={['one', 'two']} onCollapseAll={jest.fn()} />,
		);
		// header
		expect(screen.getByText('Records')).toBeVisible();
		// list is height 0 ...
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render a tree (not virtualized) ', () => {
		// fixme: find what is needed here as props to render something...
		const { container } = render(
			<Component
				{...treeProps}
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
