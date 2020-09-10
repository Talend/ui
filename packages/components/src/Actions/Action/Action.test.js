import React from 'react';
import { shallow } from 'enzyme';
import Action, { getActionComponent } from './Action.component';
import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionDropdown from '../ActionDropdown';
import ActionIconToggle from '../ActionIconToggle';
import ActionSplitDropdown from '../ActionSplitDropdown';

const MyActionButton = jest.fn();
MyActionButton.displayName = 'MyActionButton';
const MyActionSplitDropdown = jest.fn();
MyActionSplitDropdown.displayName = 'MyActionSplitDropdown';
const MyActionDropdown = jest.fn();
MyActionDropdown.displayName = 'MyActionDropdown';
const MyActionFile = jest.fn();
MyActionFile.displayName = 'MyActionFile';
const MyActionIconToggle = jest.fn();
MyActionIconToggle.displayName = 'MyActionIconToggle';
const renderers = {
	ActionButton: MyActionButton,
	ActionFile: MyActionFile,
	ActionSplitDropdown: MyActionSplitDropdown,
	ActionDropdown: MyActionDropdown,
	ActionIconToggle: MyActionIconToggle,
};
const getComponent = key => renderers[key];

describe('Action', () => {
	it('should render ActionButton', () => {
		const wrapper = shallow(<Action label="hello world" />);
		expect(wrapper.getElement().type).toBe(ActionButton);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render MyActionButton', () => {
		const wrapper = shallow(<Action label="hello world" getComponent={getComponent} />);
		expect(wrapper.getElement().type).toBe(MyActionButton);
	});
	it('should render ActionFile', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="file" />);
		expect(wrapper.getElement().type).toBe(ActionFile);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render MyActionFile', () => {
		const wrapper = shallow(
			<Action label="hello world" displayMode="file" getComponent={getComponent} />,
		);
		expect(wrapper.getElement().type).toBe(MyActionFile);
	});
	it('should render ActionSplitDropdown', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="splitDropdown" />);
		expect(wrapper.getElement().type).toBe(ActionSplitDropdown);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render MyActionSplitDropdown', () => {
		const wrapper = shallow(
			<Action label="hello world" displayMode="splitDropdown" getComponent={getComponent} />,
		);
		expect(wrapper.getElement().type).toBe(MyActionSplitDropdown);
	});
	it('should render ActionDropdown', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="dropdown" />);
		expect(wrapper.getElement().type).toBe(ActionDropdown);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render MyActionDropdown', () => {
		const wrapper = shallow(
			<Action label="hello world" displayMode="dropdown" getComponent={getComponent} />,
		);
		expect(wrapper.getElement().type).toBe(MyActionDropdown);
	});
	it('should render ActionIconToggle', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="iconToggle" />);
		expect(wrapper.getElement().type).toBe(ActionIconToggle);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render MyActionIconToggle ', () => {
		const wrapper = shallow(
			<Action label="hello world" displayMode="iconToggle" getComponent={getComponent} />,
		);
		expect(wrapper.getElement().type).toBe(MyActionIconToggle);
	});
});
