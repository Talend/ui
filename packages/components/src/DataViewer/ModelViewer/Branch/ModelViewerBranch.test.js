import React from 'react';
import { shallow } from 'enzyme';
import Component from './ModelViewerBranch.component';

describe('ModelViewerBranch', () => {
	it('render ModelViewerBranch', () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getDisplayKey: jest.fn(() => 'myKeyValue'),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: true,
			index: 0,
			isUnion: jest.fn(),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			value: {},
		};
		// when
		const wrapper = shallow(<Component {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('render ModelViewerBranch as a union', () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getChilds: jest.fn(),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: false,
			index: 0,
			isUnion: jest.fn(() => true),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			recursive: jest.fn(),
			value: {},
		};
		// when
		const wrapper = shallow(<Component {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
describe('ModelViewerBranch#onClickLeafBranch', () => {
	it('shoul call onToggle with union and firstClickUnion true', () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getChilds: jest.fn(),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: false,
			index: 0,
			isUnion: jest.fn(() => true),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			recursive: jest.fn(),
			value: {},
		};
		const event = {};
		// when
		const wrapper = shallow(<Component {...props} />);
		wrapper.instance().onClickLeafBranch(event);
		// then
		expect(props.onToggle).toHaveBeenCalledWith(
			event,
			{ firstClickUnion: true, jsonpath: '$', opened: false, value: {} },
			0,
		);
	});
	it('shoul call onToggle', () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getChilds: jest.fn(),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: false,
			index: 0,
			isUnion: jest.fn(() => false),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			recursive: jest.fn(),
			value: {},
		};
		const event = {};
		// when
		const wrapper = shallow(<Component {...props} />);
		wrapper.instance().onClickLeafBranch(event);
		// then
		expect(props.onToggle).toHaveBeenCalledWith(
			event,
			{ jsonpath: '$', opened: false, value: {} },
			0,
		);
	});
});
