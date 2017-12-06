import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action } from '../../index';
import InputTitleSubHeader, {
	EditTitle,
	DetailsTitle,
	onFocus,
} from './InputTitleSubHeader.component';

describe('InputTitleSubHeader', () => {
	it('should render', () => {
		const props = {
			title: 'myTitle',
			iconFile: 'myIconFile',
			editMode: false,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(DetailsTitle)).toHaveLength(1);
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
		expect(wrapper.find(DetailsTitle)).toHaveLength(1);
		expect(wrapper.find(EditTitle)).toHaveLength(0);
	});
	it('should render EditTitle', () => {
		const props = {
			title: 'myTitle',
			iconFile: 'myIconFile',
			editMode: true,
		};
		const wrapper = shallow(<InputTitleSubHeader {...props} />);
		expect(wrapper.find(DetailsTitle)).toHaveLength(0);
		expect(wrapper.find(EditTitle)).toHaveLength(1);
	});
});

describe('DetailsTitle', () => {
	it('should render', () => {
		const wrapper = shallow(
			<DetailsTitle title="myTitle" subTitle="mySubTitle" onEdit={jest.fn()} />,
		);
		expect(wrapper.find(Action)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with title', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with subTitle', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" subTitle="mySubTitle" />);
		expect(wrapper.getNode()).toMatchSnapshot();
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
		const wrapper = shallow(<DetailsTitle title="myTitle" onEdit={actionProps.onClick} />);
		expect(wrapper.find(Action)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('EditTitle', () => {
	it('should render', () => {
		const wrapper = shallow(
			<EditTitle
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
	it('should return selectionStart and end', () => {
		const event = {
			target: {
				value: 'myTitle',
				selectionStart: 0,
				selectionEnd: 0,
			},
		};
		onFocus(event);
		expect(event.target).toEqual({
			value: event.target.value,
			selectionStart: 0,
			selectionEnd: event.target.value.length,
		});
	});
});
