import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import Container from './SubHeaderBar.container';

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
		new Container(props).onSubmit(event);
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
		new Container(props).onSubmit(event);
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
		new Container(props).onCancel(event);
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
		new Container(props).onCancel(event);
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
		new Container(props).onCancel(event);
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
		new Container(props).onEdit(event);
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
		new Container(props).onEdit(event);
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
		new Container(props).onEdit(event);
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
		new Container(props).onChange(event);
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
		new Container(props).onChange(event);
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
		new Container(props).onChange(event);
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
		new Container(props).onGoBack(event);
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
		new Container(props).onGoBack(event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorGoBack, event, {
			props,
		});
	});
});
