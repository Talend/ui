/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import Tree, { isRoot } from './Tree.component';

jest.mock('../TreeNode', () => props => (
	<div className={props.className} data-testid="TreeNode" data-props={JSON.stringify(props)} />
));
jest.mock('../TreeNodeList', () => props => (
	<ul
		className={props.treeClassName}
		data-testid="TreeNodeList"
		data-props={JSON.stringify(props)}
		data-level={props.level}
	>
		{props.value.map((item, index) => (
			<li key={index} data-testid="TreeNodeListItem" className={props.nodeClassName}>
				{item}
			</li>
		))}
	</ul>
));

describe('isRoot', () => {
	it('should return true, its root level', () => {
		expect(isRoot(0)).toEqual(true);
	});
	it('should return false, its not root level', () => {
		expect(isRoot(1)).toEqual(false);
	});
});

describe('Tree', () => {
	it('should return a TreeNodeList', () => {
		render(<Tree value={[]} level={0} noRoot />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(JSON.parse(screen.getByRole('list').dataset.props)).toMatchObject({
			level: 0,
			value: [],
			treeClassName: 'theme-tc-tree tc-tree',
		});
	});
	it('should return a TreeNode with dataKey', () => {
		render(<Tree value={{}} dataKey="myDataKey" level={0} />);
		expect(screen.getByTestId('TreeNode')).toBeVisible();
		expect(JSON.parse(screen.getByTestId('TreeNode').dataset.props)).toMatchObject({
			dataKey: 'myDataKey',
			level: 0,
		});
	});
	it('should return a list with custom className', () => {
		render(<Tree value={[]} className="myCustomClass" level={0} noRoot />);
		expect(screen.getByRole('list')).toHaveClass('myCustomClass');
	});
	it('should return a list with a level > 0', () => {
		render(<Tree value={['test']} level={1} />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getByRole('listitem')).toBeVisible();
		expect(screen.getByRole('list')).toHaveAttribute('data-level', '1');
	});
	it('should return a list with a level > 0 and no node border', () => {
		render(<Tree value={['test']} level={1} withNodeBorder={false} />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getByRole('listitem')).toBeVisible();
	});
});
