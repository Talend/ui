import { render, screen } from '@testing-library/react';
import Tree, { isRoot } from './Tree.component';

describe('isRoot', () => {
	it('should return true, its root level', () => {
		expect(isRoot(0)).toEqual(true);
	});
	it('should return false, its not root level', () => {
		expect(isRoot(1)).toEqual(false);
	});
});

describe('Tree', () => {
	let props;
	beforeEach(() => {
		props = {
			getJSONPath: jest.fn(),
			branch: jest.fn(() => <div data-testid="branch"></div>),
			leaf: jest.fn(prop => <span data-testid="leaf" data-level={prop.level}></span>),
			getValueType: jest.fn(),
			getItemType: jest.fn(item => {
				if (Array.isArray(item)) {
					return 'array';
				}
				if (item instanceof Object) {
					return 'object';
				}
				return;
			}),
			jsonpath: '$',
			type: 'array',
			level: 0,
			index: 0,
		};
	});
	it('should return a ul', () => {
		render(<Tree {...props} value={[]} level={0} noRoot />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getByRole('list')).toHaveClass('tc-tree');
	});
	it('should return a branch', () => {
		render(<Tree {...props} value={{}} dataKey="myDataKey" level={0} />);
		expect(screen.getByTestId('branch')).toBeVisible();
	});
	it('should return a list with custom className', () => {
		render(<Tree {...props} value={[]} className="myCustomClass" level={0} noRoot />);
		expect(screen.getByRole('list')).toHaveClass('myCustomClass');
	});
	it('should return a list with a level > 0', () => {
		render(<Tree {...props} value={['test']} level={1} />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getByRole('listitem')).toBeVisible();
		expect(screen.getByRole('listitem')).toHaveClass('tc-tree-node-border');
		expect(screen.getByTestId('leaf')).toHaveAttribute('data-level', '1');
	});
	it('should return a list with a level > 0 and no node border', () => {
		render(<Tree {...props} value={['test']} level={1} withNodeBorder={false} />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getByRole('listitem')).toBeVisible();
		expect(screen.getByRole('listitem')).not.toHaveClass('tc-tree-node-border');
	});
});
