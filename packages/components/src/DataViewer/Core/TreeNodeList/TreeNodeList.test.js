import React from 'react';
import { shallow } from 'enzyme';
import TreeNodeList from './TreeNodeList.component';

describe('TreeNodeList', () => {
	it('should return a list of 3 TreeNode with an inline paddingLeft value of 30', () => {
		const value = [
			{ dataKey: 'dataKey1', value: 'toto' },
			{ dataKey: 'dataKey2', value: 'tata' },
			{ dataKey: 'dataKey3', value: 'titi' },
		];
		const props = {
			branch: jest.fn(),
			getJSONPath: () => '$',
			getValueType: jest.fn(),
			index: 0,
			jsonpath: '$',
			leaf: jest.fn(),
			nodeClassName: 'nodeClassName',
			paddingOffset: 30,
			treeClassName: 'treeClassName',
			value,
		};
		const wrapper = shallow(<TreeNodeList {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should return a list of 3 TreeNode with an inline paddingLeft value of 0', () => {
		const value = [
			{ dataKey: 'dataKey1', value: 'toto' },
			{ dataKey: 'dataKey2', value: 'tata' },
			{ dataKey: 'dataKey3', value: 'titi' },
		];
		const props = {
			branch: jest.fn(),
			getJSONPath: () => '$',
			getValueType: jest.fn(),
			index: 0,
			jsonpath: '$',
			leaf: jest.fn(),
			nodeClassName: 'nodeClassName',
			treeClassName: 'treeClassName',
			value,
		};
		const wrapper = shallow(<TreeNodeList {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
