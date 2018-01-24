import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action } from '../../index';
import InputTitleSubHeader, {
	InlineFormSubHeader,
	TitleSubHeader,
} from './InputTitleSubHeader.component';

describe('InputTitleSubHeader', () => {
	let defaultProps;
	beforeEach(
		() =>
			(defaultProps = {
				title: 'myTitle',
				onEdit: jest.fn(),
				onSubmit: jest.fn(),
			}),
	);
	it('should render', () => {
		const wrapper = shallow(<InputTitleSubHeader {...defaultProps} iconId="myIconId" />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(1);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render Icon', () => {
		const wrapper = shallow(<InputTitleSubHeader {...defaultProps} iconId="myIconId" />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Icon).get(0).props.name).toEqual('myIconId');
	});
	it('should not render Icon', () => {
		const wrapper = shallow(<InputTitleSubHeader {...defaultProps} />);
		expect(wrapper.find(Icon)).toHaveLength(0);
	});
	it('should render TitleSubHeader', () => {
		const wrapper = shallow(<InputTitleSubHeader {...defaultProps} />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(1);
		expect(wrapper.find(InlineFormSubHeader)).toHaveLength(0);
	});
	it('should render InlineFormSubHeader', () => {
		const wrapper = shallow(<InputTitleSubHeader {...defaultProps} editMode />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(0);
		expect(wrapper.find(InlineFormSubHeader)).toHaveLength(1);
	});
});

describe('TitleSubHeader', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			title: 'myTitle',
			onEdit: jest.fn(),
		};
	});
	it('should render', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} subTitle="mySubTitle" />);
		expect(wrapper.find(Action)).toHaveLength(0);
		expect(wrapper.find('h1')).toHaveLength(1);
		expect(wrapper.find('button')).toHaveLength(0);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render with title', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} />);
		expect(wrapper.find('h1').getElement().props.children).toEqual('myTitle');
	});
	it('should render with subTitle', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} subTitle="mySubTitle" />).find(
			'small',
		);
		expect(wrapper.getElement().props.className).toEqual('tc-subheader-details-text-subtitle tc-subheader-details-text-subtitle');
		expect(wrapper.getElement().props.children).toEqual('mySubTitle');
	});
	it('should render an Action with edit pencil', () => {
		const wrapper = shallow(
			<TitleSubHeader {...defaultProps} subTitle="mySubTitle" editable />,
		).find(Action);
		expect(wrapper).toHaveLength(1);
		expect(wrapper.getElement().props.icon).toEqual('talend-pencil');
	});
});

describe('InlineFormSubHeader', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			title: 'myTitle',
			onSubmit: jest.fn(),
			onChange: jest.fn(),
			onCancel: jest.fn(),
			t: jest.fn(),
		};
	});
	it('should render', () => {
		const wrapper = shallow(<InlineFormSubHeader {...defaultProps} />);
		expect(wrapper.find('input')).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should call change value and call onChange when change event trigger', () => {
		const event = { target: { value: 'myInputChage' } };
		const wrapper = shallow(<InlineFormSubHeader {...defaultProps} />);
		wrapper.find('input').simulate('change', event);
		expect(wrapper.state('value')).toBe(event.target.value);
		expect(defaultProps.onChange).toHaveBeenCalledWith(event);
		expect(wrapper.find('input').getElement().props.value).toBe(event.target.value);
	});
	it('should call onSubmit when submit event trigger', () => {
		const event = { preventDefault: jest.fn() };
		const wrapper = shallow(<InlineFormSubHeader {...defaultProps} />);
		wrapper.setState({ value: 'mySubmitData' });
		wrapper.find('form').simulate('submit', event);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(defaultProps.onSubmit).toHaveBeenCalledWith(event, {
			value: wrapper.state('value'),
			props: defaultProps,
		});
	});
	it('should call onCancel when cancel event trigger', () => {
		const event = {};
		const wrapper = shallow(<InlineFormSubHeader {...defaultProps} />);
		wrapper.setState({ value: 'myDataBeforeCancel' });
		wrapper.find({ name: 'action-cancel-title' }).simulate('click', event);
		expect(defaultProps.onCancel).toHaveBeenCalledWith(event);
		expect(wrapper.state('value')).toEqual('');
	});
	it('should call selectInput on render', () => {
		const input = { select: jest.fn(), focus: jest.fn() };
		new InlineFormSubHeader(defaultProps).selectInput(input);
		expect(input.select).toHaveBeenCalled();
		expect(input.focus).toHaveBeenCalled();
	});
});
