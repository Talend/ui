import { render, screen } from '@testing-library/react';
import TreeNodeList from './TreeNodeList.component';

function getItemType(item) {
	if (Array.isArray(item)) {
		return 'array';
	}
	if (item instanceof Object) {
		return 'object';
	}
	return;
}

describe('TreeNodeList', () => {
	it('should return a list of 3 TreeNode with an inline paddingLeft value of 30', () => {
		const value = [
			{ dataKey: 'dataKey1', value: 'toto' },
			{ dataKey: 'dataKey2', value: 'tata' },
			{ dataKey: 'dataKey3', value: 'titi' },
		];
		const props = {
			branch: jest.fn(() => <div data-testid="branch">branch</div>),
			leaf: jest.fn(({ level, paddingOffset }) => (
				<div data-testid="leaf" style={{ paddingLeft: paddingOffset }} data-level={level}>
					leaf
				</div>
			)),
			getJSONPath: () => '$',
			getValueType: jest.fn(),
			getItemType: jest.fn(getItemType),
			index: 0,
			jsonpath: '$',
			nodeClassName: 'nodeClassName',
			paddingOffset: 30,
			treeClassName: 'treeClassName',
			value,
		};
		render(<TreeNodeList {...props} />);
		expect(screen.getAllByTestId('leaf')).toHaveLength(3);
		expect(screen.getAllByTestId('leaf')[0]).toHaveStyle({ paddingLeft: 30 });
	});
});
