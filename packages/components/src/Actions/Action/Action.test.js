import React from 'react';
import { shallow } from 'enzyme';
import Action, { getActionComponent } from './Action.component';
import ActionButton from '../ActionButton';
import ActionDropdown from '../ActionDropdown';
import ActionSplitDropdown from '../ActionSplitDropdown';

const My = jest.fn();
My.displayName = 'My';
const renderers = {
	ActionButton: My,
	ActionSplitDropdown: My,
	ActionDropdown: My,
};

describe('getActionComponent', () => {
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
		const component = getActionComponent({ renderers });
		expect(component.displayName).toBe('My');
	});
	it('should return MyActionSplitDropdown if displayMode = splitDropdown', () => {
		const component = getActionComponent({ renderers, displayMode: 'splitDropdown' });
		expect(component.displayName).toBe('My');
	});
	it('should return MyActionDropdown if displayMode = dropdown', () => {
		const component = getActionComponent({ renderers, displayMode: 'dropdown' });
		expect(component.displayName).toBe('My');
	});
});

describe('Action', () => {
	it('should render ActionButton', () => {
		const wrapper = shallow(<Action label="hello world" />);
		expect(wrapper.getNode().type).toBe(ActionButton);
		expect(wrapper.getNode().props.label).toBe('hello world');
	});
	it('should render ActionSplitDropdown', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="splitDropdown" />);
		expect(wrapper.getNode().type).toBe(ActionSplitDropdown);
		expect(wrapper.getNode().props.label).toBe('hello world');
	});
	it('should render ActionDropdown', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="dropdown" />);
		expect(wrapper.getNode().type).toBe(ActionDropdown);
		expect(wrapper.getNode().props.label).toBe('hello world');
	});
});
