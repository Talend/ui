import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './SubHeaderBar.container';
import Connect from './SubHeaderBar.connect';
import { getComponentState, getEditMode } from './SubHeaderBar.selectors';

describe('Connect', () => {
	it('should connect SubHeaderBar', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('SubHeaderBar container', () => {
	it('should render', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should setState when submit event trigger', () => {
		const event = {};
		let state;
		const props = {
			state: Map({ editMode: true }),
			setState: jest.fn(fn => (state = fn())),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('submit', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
	});
	it('should call onSubmit when submit event trigger', () => {
		const event = {};
		const data = { value: 'submitValue', props: {} };
		const props = {
			onSubmit: jest.fn(),
			state: Map({ editMode: false }),
			setState: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('submit', event, data);
		expect(props.setState).toHaveBeenCalled();
		expect(props.onSubmit).toHaveBeenCalledWith(event, data);
	});
	it('should call ActionCreatorSubmit when submit event trigger', () => {
		const event = {};
		const data = { value: 'submitValue', props: {} };
		const props = {
			actionCreatorSubmit: 'mySubmitActionCreator',
			dispatchActionCreator: jest.fn(),
			state: Map({ editMode: false }),
			setState: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('submit', event, data);
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorSubmit, event, {
			props,
			data,
		});
	});
	it('should setState when cancel event trigger', () => {
		const event = {};
		let state;
		const props = {
			state: Map({ editMode: true }),
			setState: jest.fn(fn => (state = fn())),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('cancel', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
	});
	it('should call onCancel when cancel event trigger', () => {
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('cancel', event);
		expect(props.onCancel).toHaveBeenCalledWith(event);
	});
	it('should call actionCreatorCancel when cancel event trigger', () => {
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			actionCreatorCancel: 'myCancelActionCreator',
			dispatchActionCreator: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('cancel', event);
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorCancel, event, {
			props,
		});
	});
	it('should call setState when edit event trigger', () => {
		const event = {};
		let state;
		const props = {
			state: Map({ editMode: true }),
			setState: jest.fn(fn => (state = fn())),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('edit', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
	});
	it('should call onEdit when edit event trigger', () => {
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			onEdit: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('edit', event);
		expect(props.onEdit).toHaveBeenCalledWith(event);
	});
	it('should call onEdit when edit event trigger', () => {
		// Given
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			dispatchActionCreator: jest.fn(),
			actionCreatorEdit: 'myEditActionCreator',
		};
		// When
		shallow(<Container {...props} />).simulate('edit', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorEdit, event, {
			props,
		});
	});
	it('should call onChange when change event trigger', () => {
		// Given
		const event = { target: { value: 'my onChangeTitle' } };
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
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
			state: Map({ editMode: false }),
			dispatchActionCreator: jest.fn(),
			actionCreatorChange: 'myChangeActionCreator',
		};
		// When
		shallow(<Container {...props} />).simulate('change', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorChange, event, {
			props,
			value: event.target.value,
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
			actionCreatorGoBack: 'myGoBackActionCreator',
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

describe('SubHeaderBar selectors', () => {
	let mockState;
	const componentState = Map({ editMode: true });
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
	it('should return the editMode', () => {
		expect(getEditMode(mockState, 'mySubHeaderBar')).toEqual(true);
	});
	it('should return the editModet', () => {
		expect(getEditMode(mockState, 'wrongComponentId')).toEqual(false);
	});
});
