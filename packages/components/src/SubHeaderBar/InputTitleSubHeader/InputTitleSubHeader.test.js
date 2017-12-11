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
	});
	it('should not render Icon', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(Icon)).toHaveLength(0);
	});
	it('should render DetailsTitle', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(1);
		expect(wrapper.find(InlineFormSubHeader)).toHaveLength(0);
	});
	it('should render EditTitle', () => {
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
		expect(wrapper.find('h1').getNode().props.className).toEqual('tc-subheader-details-text-title-wording');
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
	it('should render', () => {
		const wrapper = shallow(
			<InlineFormSubHeader
				title="myTitle"
				inputTextValue="value"
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				onChange={jest.fn()}
			/>,
		);
		expect(wrapper.find('input')).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
