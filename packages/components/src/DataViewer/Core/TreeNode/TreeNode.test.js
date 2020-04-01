import React from 'react';
import { shallow } from 'enzyme';
import TreeNode, {
	isBranch,
	isBranchOpened,
	isNodeHighlighted,
	isDeepNodeHighlighted,
} from './TreeNode.component';

describe('isBranch', () => {
	it('should return true', () => {
		expect(isBranch('array')).toEqual(true);
	});
	it('should return true', () => {
		expect(isBranch('object')).toEqual(true);
	});
	it('should return false', () => {
		expect(isBranch('something')).toEqual(false);
	});
});

describe('isBranchOpened', () => {
	it('should return true with expandAll false', () => {
		const paths = ['jsonpath'];
		const ret = isBranchOpened(false, 0, paths, 'jsonpath');
		expect(ret).toEqual(true);
	});
	it('should return false with expandAll false', () => {
		const paths = [];
		const ret = isBranchOpened(false, 0, paths, 'jsonpath');
		expect(ret).toEqual(false);
	});
	it('should return false with expandAll true', () => {
		const paths = ['jsonpath'];
		const ret = isBranchOpened(true, 0, paths, 'jsonpath');
		expect(ret).toEqual(false);
	});
	it('should return true with expandAll true', () => {
		const paths = [];
		const ret = isBranchOpened(true, 0, paths, 'jsonpath');
		expect(ret).toEqual(true);
	});
});

describe('isNodeHighlighted', () => {
	it('should return true, the node is highlighted', () => {
		expect(isNodeHighlighted(['jsonpath'], 'jsonpath')).toEqual(true);
	});
	it('should return false, the node is not highlighted', () => {
		expect(isNodeHighlighted([''], 'jsonpath')).toEqual(false);
	});
});

describe('isDeepNodeHighlighted', () => {
	it('shoul return true, when its an object and its not opened', () => {
		expect(isDeepNodeHighlighted(false, true, 'ojbect')).toBe(true);
	});
	it('shoul return true, when its something else than object and highlist is true', () => {
		expect(isDeepNodeHighlighted(false, true, 'something')).toBe(true);
	});
	it('shoul return false, when highlist is false', () => {
		expect(isDeepNodeHighlighted(false, false, 'object')).toBe(false);
	});
});

describe('TreeNode', () => {
	it('should return a new branch', () => {
		const props = {
			level: 0,
			value: {},
			jsonpath: '',
			index: 0,
		};
		const branch = jest.fn();
		branch.mockReturnValueOnce(<div>new branch</div>);
		const leaf = jest.fn();
		const getItemType = jest.fn();
		getItemType.mockReturnValueOnce('array');
		const wrapper = shallow(
			<TreeNode {...props} getItemType={getItemType} branch={branch} leaf={leaf} />,
		);
		expect(branch).toHaveBeenCalled();
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should return a new leaf', () => {
		const props = {
			level: 0,
			value: {},
			jsonpath: '',
			index: 0,
		};
		const branch = jest.fn();
		const leaf = jest.fn();
		leaf.mockReturnValueOnce(<div>new leaf</div>);
		const getItemType = jest.fn();
		getItemType.mockReturnValueOnce('something');
		const wrapper = shallow(
			<TreeNode {...props} getItemType={getItemType} branch={branch} leaf={leaf} />,
		);
		expect(leaf).toHaveBeenCalled();
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
