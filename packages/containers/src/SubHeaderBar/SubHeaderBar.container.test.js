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
});
