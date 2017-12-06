import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { Inject } from '@talend/react-cmf';
import mock from '@talend/react-cmf/lib/mock';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './SubHeaderBar.container';
import Connect, { buildComponents, mapStateToProps } from './SubHeaderBar.connect';
import { getComponentState, getInputText } from './SubHeaderBar.selectors';

describe('Connect', () => {
	it('should connect ShortcutManager', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('mapStateToProps', () => {
	it('should return Inject components by position', () => {
		const state = mock.state();
		const ownProps = {
			injectedComponents: {
				center: [
					{
						componentId: 'FilterBar',
						navbar: true,
						docked: false,
						dockable: false,
					},
				],
				right: [
					{
						actionId: 'subheaderbar:action-sharing',
						componentId: 'Action',
					},
					{
						actionId: 'subheaderbar:action-bubbles',
						componentId: 'Action',
					},
				],
			},
		};
		const props = mapStateToProps(state, ownProps);
		expect(props).toEqual({
			componentsCenter: [
				{
					injectedComponent: (
						<Inject component="FilterBar" dockable={false} docked={false} navbar={true} />
					),
				},
			],
			componentsRight: [
				{ injectedComponent: <Inject actionId="subheaderbar:action-sharing" component="Action" /> },
				{ injectedComponent: <Inject actionId="subheaderbar:action-bubbles" component="Action" /> },
			],
		});
	});
	it('should return empty props', () => {
		const state = mock.state();
		const props = { lotOfStuff: 'fullStuffButNoInjectedComponents' };
		expect(mapStateToProps(state, props)).toEqual({});
	});
});

describe('buildActions', () => {
	it('should render Injected components', () => {
		const state = mock.state();
		const injectedComponents = [
			{
				actionId: 'subheaderbar:action-sharing',
				componentId: 'Action',
			},
			{
				actionId: 'subheaderbar:action-bubbles',
				componentId: 'Action',
			},
		];
		expect(buildComponents(state, injectedComponents)).toEqual([
			{ injectedComponent: <Inject actionId="subheaderbar:action-sharing" component="Action" /> },
			{ injectedComponent: <Inject actionId="subheaderbar:action-bubbles" component="Action" /> },
		]);
	});
	it('should return empty array', () => {
		const state = mock.state();
		const injectedComponents = [
			{
				actionId: 'subheaderbar:action-sharing',
			},
			{
				actionId: 'subheaderbar:action-bubbles',
			},
		];
		expect(buildComponents(state, injectedComponents)).toEqual([]);
	});
});

describe('SubHeaderBar container', () => {
	it('should render', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should call onSubmit when submit event trigger', () => {
		// Given
		const event = {};
		const props = {
			onSubmit: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
		};
		// When
		shallow(<Container {...props} />).simulate('submit', event);
		// Then
		expect(props.onSubmit).toHaveBeenCalledWith(event, props.state.get('inputText'));
	});
	it('should call ActionCreatorSubmit when submit event trigger', () => {
		// Given
		const event = {};
		const props = {
			actionCreatorSubmit: jest.fn(),
			dispatchActionCreator: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
		};
		// When
		shallow(<Container {...props} />).simulate('submit', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorSubmit, event, {
			props,
			inputText: props.state.get('inputText'),
		});
	});
	it('should setState when cancel event trigger', () => {
		const event = {};
		let state;
		const props = {
			state: Map({ editMode: true, inputText: 'my edited title' }),
			setState: jest.fn(fn => (state = fn())),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('cancel', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
		expect(state.inputText).toEqual('');
	});
	it('should call onCancel when cancel event trigger', () => {
		// Given
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
			onCancel: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('cancel', event);
		// Then
		expect(props.onCancel).toHaveBeenCalledWith(event);
	});
	it('should call actionCreatorCancel when cancel event trigger', () => {
		// Given
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
			actionCreatorCancel: jest.fn(),
			dispatchActionCreator: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('cancel', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorCancel, event, {
			props,
		});
	});
	it('should call setState when edit event trigger', () => {
		const event = {};
		let state;
		const props = {
			state: Map({ editMode: true, inputText: 'my edited title' }),
			setState: jest.fn(fn => (state = fn())),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('edit', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
	});
	it('should call onEdit when edit event trigger', () => {
		// Given
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
			onEdit: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('edit', event);
		// Then
		expect(props.onEdit).toHaveBeenCalledWith(event);
	});
	it('should call onEdit when edit event trigger', () => {
		// Given
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
			dispatchActionCreator: jest.fn(),
			actionCreatorEdit: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('edit', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorEdit, event, {
			props,
		});
	});
	it('should call setState when change event trigger', () => {
		const event = { target: { value: 'my new edited title' } };
		let state;
		const props = {
			state: Map({ editMode: true, inputText: 'my old title' }),
			setState: jest.fn(fn => (state = fn())),
			onCChange: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('change', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.inputText).toEqual(event.target.value);
	});
	it('should call onChange when change event tigger', () => {
		// Given
		const event = { target: { value: 'my onChangeTitle' } };
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
			onChange: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('change', event);
		// Then
		expect(props.onChange).toHaveBeenCalledWith(event, event.target.value);
	});
	it('should call onChange when change event tigger', () => {
		// Given
		const event = { target: { value: 'my onChangeTitle' } };
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false, inputText: 'my new title' }),
			dispatchActionCreator: jest.fn(),
			actionCreatorChange: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('change', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorChange, event, {
			props,
			inputText: event.target.value,
		});
	});
	it('should call onGoBack event when goBack event trigger', () => {
		// Given
		const event = {};
		const props = {
			onGoBack: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('goBack', event);
		// Then
		expect(props.onGoBack).toHaveBeenCalledWith(event);
	});
	it('should call actionCreatorGoBack event when goBack event trigger', () => {
		// Given
		const event = {};
		const props = {
			actionCreatorGoBack: jest.fn(),
			dispatchActionCreator: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('goBack', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorGoBack, event, {
			props,
		});
	});
});

let mockState;
describe('SubHeaderBar selectors', () => {
	const componentState = Map({ editMode: true, inputText: 'my edited title' });
	beforeEach(() => {
		mockState = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ mySubHeaderBar: componentState }) }),
			},
		};
	});
	it('should return the state', () => {
		expect(getComponentState(mockState, 'mySubHeaderBar')).toEqual(componentState);
	});
	it('should return the default state', () => {
		expect(getComponentState(mockState, 'wrongComponentId')).toEqual(DEFAULT_STATE);
	});
	it('should return the inputText', () => {
		expect(getInputText(mockState, 'mySubHeaderBar')).toEqual('my edited title');
	});
	it('should return the inputText', () => {
		expect(getInputText(mockState, 'wrongComponentId')).toEqual('');
	});
});
