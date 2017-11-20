import React from 'react';
import { shallow } from 'enzyme';
import Action, { getActionComponent, wrapOnClick } from './Action.component';
import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionDropdown from '../ActionDropdown';
import ActionSplitDropdown from '../ActionSplitDropdown';

const MyActionButton = jest.fn();
MyActionButton.displayName = 'MyActionButton';
const MyActionSplitDropdown = jest.fn();
MyActionSplitDropdown.displayName = 'MyActionSplitDropdown';
const MyActionDropdown = jest.fn();
MyActionDropdown.displayName = 'MyActionDropdown';
const MyActionFile = jest.fn();
MyActionFile.displayName = 'MyActionFile';
const renderers = {
	ActionButton: MyActionButton,
	ActionFile: MyActionFile,
	ActionSplitDropdown: MyActionSplitDropdown,
	ActionDropdown: MyActionDropdown,
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
		expect(component.displayName).toBe('MyActionButton');
	});
	it('should return MyActionFile if displayMode = file', () => {
		const component = getActionComponent({ renderers, displayMode: 'file' });
		expect(component.displayName).toBe('MyActionFile');
	});
	it('should return MyActionSplitDropdown if displayMode = splitDropdown', () => {
		const component = getActionComponent({ renderers, displayMode: 'splitDropdown' });
		expect(component.displayName).toBe('MyActionSplitDropdown');
	});
	it('should return MyActionDropdown if displayMode = dropdown', () => {
		const component = getActionComponent({ renderers, displayMode: 'dropdown' });
		expect(component.displayName).toBe('MyActionDropdown');
	});
});

describe('Action', () => {
	it('should render ActionButton', () => {
		const wrapper = shallow(<Action label="hello world" />);
		expect(wrapper.getNode().type).toBe(ActionButton);
		expect(wrapper.getNode().props.label).toBe('hello world');
	});
	it('should render ActionButton', () => {
		const wrapper = shallow(<Action label="hello world" displayMode="file" />);
		expect(wrapper.getNode().type).toBe(ActionFile);
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

describe('#wrapOnClick', () => {
	it('should return onclick', () => {
		// given
		const onClick = jest.fn();
		const eventFn = wrapOnClick({
			onClick,
			bsStyle: 'bsStyle',
			inProgress: 'inProgress',
			disabled: 'disabled',
			hideLabel: 'hideLabel',
			link: 'link',
			onMouseDown: 'onMouseDown',
			tooltipPlacement: 'tooltipPlacement',
			tooltip: 'tooltip',
			tooltipLabel: 'tooltipLabel',
			available: 'available',
			label: 'label',
			model: {
				id: '#model',
			},
			otherProperty: 'otherProperty',
		});

		// when
		eventFn({
			type: 'click',
		});

		// then
		expect(onClick).toHaveBeenCalledWith(
			{
				type: 'click',
			},
			{
				action: {
					available: 'available',
					bsStyle: 'bsStyle',
					disabled: 'disabled',
					hideLabel: 'hideLabel',
					inProgress: 'inProgress',
					label: 'label',
					link: 'link',
					onMouseDown: 'onMouseDown',
					otherProperty: 'otherProperty',
					tooltip: 'tooltip',
					tooltipLabel: 'tooltipLabel',
					tooltipPlacement: 'tooltipPlacement',
				},
				model: { id: '#model' },
			},
		);
	});
});
