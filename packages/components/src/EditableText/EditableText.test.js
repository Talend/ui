import React from 'react';
import { shallow } from 'enzyme';
import { Action } from '../index';
import { EditableTextComponent, PlainTextTitle } from './EditableText.component';
import InlineForm from './InlineForm.component';

describe('EditableText', () => {
	let defaultProps;
	beforeEach(
		() =>
			(defaultProps = {
				text: 'my text',
				feature: 'my.custom.feature',
				onEdit: jest.fn(),
				onSubmit: jest.fn(),
			}),
	);
	it('should render', () => {
		const wrapper = shallow(<EditableTextComponent {...defaultProps} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render InlineForm', () => {
		const wrapper = shallow(<EditableTextComponent {...defaultProps} editMode />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render skeleton', () => {
		const wrapper = shallow(<EditableTextComponent {...defaultProps} loading />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render inProgress', () => {
		const wrapper = shallow(<EditableTextComponent {...defaultProps} inProgress />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('PlainTextTitle', () => {
	it('should render', () => {
		const props = {
			text: 'text',
			feature: 'my.custom.feature',
			onEdit: jest.fn(),
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render in disabled state', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			disabled: true,
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);

		expect(wrapper.find('Action').prop('disabled')).toBe(true);
	});

	it('should render inProgress state', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			inProgress: true,
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		expect(wrapper.find('Action').prop('disabled')).toBe(true);
	});

	it('should trigger onEdit when click on the action', () => {
		const onEdit = jest.fn();
		const props = {
			text: 'text',
			onEdit,
			inProgress: true,
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		wrapper.find('Action').simulate('click');
		expect(onEdit).toHaveBeenCalled();
	});
});

describe('InlineForm', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			text: 'my text',
			feature: 'my.custom.feature',
			onSubmit: jest.fn(),
			onChange: jest.fn(),
			onCancel: jest.fn(),
			t: jest.fn(),
		};
	});
	it('should render', () => {
		const wrapper = shallow(<InlineForm {...defaultProps} />);
		expect(wrapper.find('input')).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should call change value and call onChange when change event trigger', () => {
		const event = { target: { value: 'myInputChage' } };
		const wrapper = shallow(<InlineForm {...defaultProps} />);
		wrapper.find('input').simulate('change', event);
		expect(wrapper.state('value')).toBe(event.target.value);
		expect(defaultProps.onChange).toHaveBeenCalledWith(event);
		expect(wrapper.find('input').getElement().props.value).toBe(event.target.value);
	});
	it('should call onSubmit when submit event trigger', () => {
		const event = { preventDefault: jest.fn() };
		const wrapper = shallow(<InlineForm {...defaultProps} />);
		wrapper.setState({ value: 'mySubmitData' });
		wrapper.find('form').simulate('submit', event);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(defaultProps.onSubmit).toHaveBeenCalledWith(event, {
			value: wrapper.state('value'),
			props: defaultProps,
		});
	});
	it('should not call onSubmit when submit event trigger with empty value', () => {
		const event = { preventDefault: jest.fn() };
		const wrapper = shallow(<InlineForm {...defaultProps} />);
		expect(
			wrapper
				.find('.form-group')
				.first()
				.props().className,
		).toBe('form-group');
		expect(
			wrapper
				.find('Action')
				.at(1)
				.props().disabled,
		).toBe(false);
		wrapper.setState({ value: ' ' });
		expect(
			wrapper
				.find('.form-group')
				.first()
				.props().className,
		).toBe('form-group has-error');
		expect(
			wrapper
				.find('Action')
				.at(1)
				.props().disabled,
		).toBe(true);
		wrapper.find('form').simulate('submit', event);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(defaultProps.onSubmit).not.toHaveBeenCalled();
	});
	it('should call onCancel when cancel event trigger', () => {
		const event = {};
		const wrapper = shallow(<InlineForm {...defaultProps} />);
		wrapper.setState({ value: 'myDataBeforeCancel' });
		wrapper.find({ name: 'action-cancel-title' }).simulate('click', event);
		expect(defaultProps.onCancel).toHaveBeenCalledWith(event);
		expect(wrapper.state('value')).toEqual('');
	});
	it('should call selectInput on render', () => {
		const input = { select: jest.fn(), focus: jest.fn() };
		new InlineForm(defaultProps).selectInput(input);
		expect(input.select).toHaveBeenCalled();
		expect(input.focus).toHaveBeenCalled();
	});
});
