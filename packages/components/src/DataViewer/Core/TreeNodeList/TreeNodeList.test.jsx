/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import TreeNodeList from './TreeNodeList.component';

jest.mock('../TreeNode', () => props => (
	<div data-testid="TreeNode" data-props={JSON.stringify(props)} />
));

describe('TreeNodeList', () => {
	it('should return a list of 3 TreeNode with an inline paddingLeft value of 30', () => {
		const value = [
			{ dataKey: 'dataKey1', value: 'toto' },
			{ dataKey: 'dataKey2', value: 'tata' },
			{ dataKey: 'dataKey3', value: 'titi' },
		];
		const props = {
			getJSONPath: () => '$',
			index: 0,
			jsonpath: '$',
			nodeClassName: 'nodeClassName',
			treeClassName: 'treeClassName',
			value,
		};
		render(<TreeNodeList {...props} />);
		expect(screen.getAllByTestId('TreeNode')).toHaveLength(3);
		const firstNode = screen.getAllByTestId('TreeNode')[0];
		expect(JSON.parse(firstNode.dataset.props)).toMatchObject({
			dataKey: 'dataKey1',
			index: 0,
			jsonpath: '$',
			value: 'toto',
			dataKey: 'dataKey1',
		});
	});
});
