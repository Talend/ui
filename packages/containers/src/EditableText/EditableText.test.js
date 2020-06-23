import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import Container, { DISPLAY_NAME } from './EditableText.container';
import Connect from './EditableText.connect';
import { getEditMode } from './EditableText.selectors';

describe('Connect', () => {
	it('should connect EditableText', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('EditableText container', () => {
	it('should render', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should setState when submit event trigger', () => {
		const event = {};
		let state;
		const props = {
			state: Map({ editMode: true }),
			setState: jest.fn(fn => {
				state = fn;
			}),
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
			setState: jest.fn(fn => {
				state = fn;
			}),
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
			state: Map({ editMode: false }),
			setState: jest.fn(fn => {
				state = fn;
			}),
			onCancel: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('edit', event);
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(true);
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
		const event = {};
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			dispatchActionCreator: jest.fn(),
			actionCreatorEdit: 'myEditActionCreator',
		};
		shallow(<Container {...props} />).simulate('edit', event);
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorEdit, event, {
			props,
		});
	});
	it('should call onChange when change event trigger', () => {
		const event = { target: { value: 'my onChangeTitle' } };
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			onChange: jest.fn(),
		};
		shallow(<Container {...props} />).simulate('change', event);
		expect(props.onChange).toHaveBeenCalledWith(event, event.target.value);
	});
	it('should call onChange when change event tigger', () => {
		const event = { target: { value: 'my onChangeTitle' } };
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			dispatchActionCreator: jest.fn(),
			actionCreatorChange: 'myChangeActionCreator',
		};
		shallow(<Container {...props} />).simulate('change', event);
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorChange, event, {
			props,
			value: event.target.value,
		});
	});
});

describe('EditableText selectors', () => {
	let mockState;
	const componentState = Map({ editMode: true });
	beforeEach(() => {
		mockState = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ myEditableText: componentState }) }),
			},
		};
	});
	it('should return the editMode', () => {
		expect(getEditMode(mockState, 'myEditableText')).toEqual(true);
	});
	it('should return the editModet', () => {
		expect(getEditMode(mockState, 'wrongComponentId')).toEqual(false);
	});
});
