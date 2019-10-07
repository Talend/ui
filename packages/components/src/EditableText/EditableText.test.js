import React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';
import { Action } from '../index';
import { EditableTextComponent, PlainTextTitle } from './EditableText.component';
import InlineForm from './InlineForm.component';
import getDefaultT from '../translate';

describe('EditableText', () => {
	let defaultProps;
	beforeEach(
		() =>
			(defaultProps = {
				text: 'my text',
				feature: 'my.custom.feature',
				onEdit: jest.fn(),
				onSubmit: jest.fn(),
				required: true,
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

	it('should render provided component class', () => {
		const props = {
			text: 'text',
			feature: 'my.custom.feature',
			onEdit: jest.fn(),
			componentClass: 'h1',
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

	it('should render empty text with pencil', () => {
		const props = {
			text: '',
			onEdit: jest.fn(),
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		expect(
			wrapper
				.find('Action')
				.props()
				.className.includes('tc-editable-text-empty-pencil'),
		).toBeTruthy();
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
			required: true,
			t: getDefaultT,
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
	it('should call onCancel when ESC', () => {
		const event = { keyCode: keycode.codes.esc };
		const wrapper = shallow(<InlineForm {...defaultProps} />);
		wrapper.setState({ value: 'myDataBeforeCancel' });
		wrapper
			.find('input')
			.at(0)
			.simulate('keydown', event);
		expect(defaultProps.onCancel).toHaveBeenCalledWith(event);
		expect(wrapper.state('value')).toEqual('');
	});

	it('should call selectInput on render', () => {
		const input = { select: jest.fn(), focus: jest.fn() };
		new InlineForm(defaultProps).selectInput(input);
		expect(input.select).toHaveBeenCalled();
		expect(input.focus).toHaveBeenCalled();
	});
	it('should show an error message if errorMessage is provided', () => {
		const errorMessage = 'Custom error message';
		const props = { ...defaultProps, errorMessage };
		const wrapper = shallow(<InlineForm {...props} />);

		expect(
			wrapper
				.find('.form-group')
				.first()
				.props().className,
		).toBe('form-group has-error');
		expect(
			wrapper
				.find('.form-group')
				.first()
				.text(),
		).toBe(errorMessage);
	});
	it('should not show errors if not required', () => {
		const event = { preventDefault: jest.fn() };
		const props = { ...defaultProps, required: false };
		const wrapper = shallow(<InlineForm {...props} />);
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
		).toBe('form-group');
		expect(
			wrapper
				.find('Action')
				.at(1)
				.props().disabled,
		).toBe(false);
		wrapper.find('form').simulate('submit', event);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(defaultProps.onSubmit).toHaveBeenCalled();
	});
	it('should add placeholder to input', () => {
		const placeholder = 'Your text here...';
		const props = { ...defaultProps, required: false, placeholder };
		const wrapper = shallow(<InlineForm {...props} />);
		expect(wrapper.find('input').getElement().props.placeholder).toBe(placeholder);
	});
});
