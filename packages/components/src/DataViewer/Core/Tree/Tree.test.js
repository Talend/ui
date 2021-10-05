import React from 'react';
import { shallow } from 'enzyme';
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
			branch: jest.fn(),
			leaf: jest.fn(),
			getValueType: jest.fn(),
			jsonpath: '$',
		};
	});
	it('should return a TreeNodeList', () => {
		const wrapper = shallow(<Tree {...props} value={[]} level={0} noRoot />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should return a TreeNode', () => {
		const wrapper = shallow(<Tree {...props} value={{}} dataKey="myDataKey" level={0} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should return a TreeNodeList with custom className', () => {
		const wrapper = shallow(
			<Tree {...props} value={[]} className="myCustomClass" level={0} noRoot />,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should return a TreeNodeList with a level > 0', () => {
		const wrapper = shallow(<Tree {...props} value={[]} level={1} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should return a TreeNodeList with a level > 0 and no node border', () => {
		const wrapper = shallow(<Tree {...props} value={[]} level={1} withNodeBorder={false} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
