import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action } from '../../index';
import InputTitleSubHeader, {
	InlineFormSubHeader,
	TitleSubHeader,
} from './InputTitleSubHeader.component';

describe('InputTitleSubHeader', () => {
	it('should render', () => {
		const props = {
			title: 'myTitle',
			iconFile: 'myIconFile',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render Icon', () => {
		const props = {
			title: 'myTitle',
			iconFile: 'myIconFile',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Icon).get(0).props.name).toEqual('myIconFile');
	});
	it('should not render Icon', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(Icon)).toHaveLength(0);
	});
	it('should render TitleSubHeader', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(1);
		expect(wrapper.find(InlineFormSubHeader)).toHaveLength(0);
	});
	it('should render InputTitleSubHeader', () => {
		const props = {
			title: 'myTitle',
			iconFile: 'myIconFile',
			editMode: true,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(0);
		expect(wrapper.find(InlineFormSubHeader)).toHaveLength(1);
	});
});

describe('TitleSubHeader', () => {
	it('should render', () => {
		const wrapper = shallow(
			<TitleSubHeader title="myTitle" subTitle="mySubTitle" onEdit={jest.fn()} />,
		);
		expect(wrapper.find(Action)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with title', () => {
		const wrapper = shallow(<TitleSubHeader title="myTitle" />);
		expect(wrapper.find('h1').getNode().props.className).toEqual(
			'tc-subheader-details-text-title-wording',
		);
		expect(wrapper.find('h1').getNode().props.children).toEqual('myTitle');
	});
	it('should render with subTitle', () => {
		const wrapper = shallow(<TitleSubHeader title="myTitle" subTitle="mySubTitle" />).find('small');
		expect(wrapper.getNode().props.className).toEqual('tc-subheader-details-text-subtitle');
		expect(wrapper.getNode().props.children).toEqual('mySubTitle');
	});
	it('should render an Action', () => {
		const actionProps = {
			name: 'action-edit-title',
			label: 'edit',
			icon: 'talend-pencil',
			onClick: jest.fn(),
			bsStyle: 'link',
			className: undefined,
			hideLabel: true,
		};
		const wrapper = shallow(<TitleSubHeader title="myTitle" onEdit={actionProps.onClick} />);
		expect(wrapper.find(Action)).toHaveLength(1);
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
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should call change value and call onChange when change event trigger', () => {
		const event = { target: { value: 'myInputChage' } };
		const wrapper = shallow(<InlineFormSubHeader {...defaultProps} />);
		wrapper.find('input').simulate('change', event);
		expect(wrapper.state('value')).toBe(event.target.value);
		expect(defaultProps.onChange).toHaveBeenCalledWith(event);
		expect(wrapper.find('input').getNode().props.value).toBe(event.target.value);
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
	it('sould call selectInput on render', () => {
		const input = { select: jest.fn(), focus: jest.fn() };
		new InlineFormSubHeader(defaultProps).selectInput(input);
		expect(input.select).toHaveBeenCalled();
		expect(input.focus).toHaveBeenCalled();
	});
});
