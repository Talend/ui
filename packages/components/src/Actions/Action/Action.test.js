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

describe('getActionComponent', () => {
	it('should return ActionButton with unknown displayMode and no getComponent', () => {
		const component = getActionComponent({
			displayMode: 'unknown',
		});
		expect(component).toBe(ActionButton);
	});
	it('should return ActionButton without displayMode', () => {
		const component = getActionComponent({});
		expect(component).toBe(ActionButton);
	});
	it('should return ActionSplitDropdown if displayMode = splitDropdown', () => {
		const component = getActionComponent({ displayMode: 'splitDropdown' });
		expect(component).toBe(ActionSplitDropdown);
	});
	it('should return ActionDropdown if displayMode = dropdown', () => {
		const component = getActionComponent({ displayMode: 'dropdown' });
		expect(component).toBe(ActionDropdown);
	});
	it('should return MyActionButton without displayMode', () => {
		const component = getActionComponent({ getComponent });
		expect(component.displayName).toBe('MyActionButton');
	});
	it('should return MyActionFile if displayMode = file', () => {
		const component = getActionComponent({ getComponent, displayMode: 'file' });
		expect(component.displayName).toBe('MyActionFile');
	});
	it('should return MyActionSplitDropdown if displayMode = splitDropdown', () => {
		const component = getActionComponent({ getComponent, displayMode: 'splitDropdown' });
		expect(component.displayName).toBe('MyActionSplitDropdown');
	});
	it('should return MyActionDropdown if displayMode = dropdown', () => {
		const component = getActionComponent({ getComponent, displayMode: 'dropdown' });
		expect(component.displayName).toBe('MyActionDropdown');
	});
	it('should return MyActionIconToggle if displayMode = iconToggle', () => {
		const component = getActionComponent({ getComponent, displayMode: 'iconToggle' });
		expect(component.displayName).toBe('MyActionIconToggle');
	});
});

describe('Action', () => {
	it('should render ActionButton', () => {
		const wrapper = shallow(<Action label="hello world" />);
		expect(wrapper.getElement().type).toBe(ActionButton);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render ActionButton', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="file" />);
		expect(wrapper.getElement().type).toBe(ActionFile);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render ActionSplitDropdown', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="splitDropdown" />);
		expect(wrapper.getElement().type).toBe(ActionSplitDropdown);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render ActionDropdown', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="dropdown" />);
		expect(wrapper.getElement().type).toBe(ActionDropdown);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
	it('should render ActionIconToggle', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="iconToggle" />);
		expect(wrapper.getElement().type).toBe(ActionIconToggle);
		expect(wrapper.getElement().props.label).toBe('hello world');
	});
});
