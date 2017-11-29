import React from 'react';
import { shallow, mount } from 'enzyme';
import { Icon, Action } from '../index';
import SubHeaderBar, {
	SubHeaderBarActions,
	EditTitle,
	DetailsTitle,
	DetailsIcon,
	getComponentFromType,
} from './SubHeaderBar.component';

describe('getComponentFromType', () => {
	it('should return a component', () => {
		expect(getComponentFromType({ component: <Icon name="talend-pencil" /> })).toEqual(
			<Icon name="talend-pencil" />,
		);
	});
	it('should return an Action component', () => {
		expect(getComponentFromType({ renderType: 'action' })).toEqual(<Action />);
	});
	it('should return null when no parameters', () => {
		expect(getComponentFromType()).toEqual(null);
	});
	it('should return null when no component or renderType found ', () => {
		expect(getComponentFromType({ renderType: '', component: '' })).toEqual(null);
	});
});

describe('DetailsIcon', () => {
	it('should render', () => {
		const wrapper = shallow(<DetailsIcon iconFile="talend-pencil" />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render an Icon component', () => {
		const wrapper = shallow(<DetailsIcon iconFile="talend-pencil" />);
		expect(wrapper.find(Icon).getNode().props.name).toBe('talend-pencil');
		expect(wrapper.find(Icon)).toHaveLength(1);
	});
});

describe('DetailsTitle', () => {
	it('should render', () => {
		const wrapper = shallow(
			<DetailsTitle
				title="myTitle"
				subTitle="mySubTitle"
				iconFile="talend-pencil"
				onEdit={jest.fn()}
			/>,
		);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render a DetailsIcon', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" iconFile="talend-pencil" />);
		expect(wrapper.find(DetailsIcon).getNode().props.iconFile).toBe('talend-pencil');
		expect(wrapper.find(DetailsIcon)).toHaveLength(1);
	});
	it('should render with title', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" />);
		expect(wrapper.text()).toBe('myTitle');
	});
	it('should render with subTitle', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" subTitle="mySubTitle" />);
		expect(wrapper.text()).toBe('myTitlemySubTitle');
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
		expect(wrapper.find(Action).getNode().props).toEqual(actionProps);
		expect(wrapper.find(Action)).toHaveLength(1);
	});
});

describe('EditTitle', () => {
	it('should render', () => {
		const wrapper = shallow(
			<EditTitle
				title="myTitle"
				iconFile="talend-pencil"
				inputTextValue=""
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				onChange={jest.fn()}
			/>,
		);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render DetailsTitle', () => {
		const wrapper = shallow(<EditTitle title="myTitle" iconFile="talend-pencil" />);
		expect(wrapper.find(DetailsIcon).getNode().props.iconFile).toBe('talend-pencil');
		expect(wrapper.find(DetailsIcon)).toHaveLength(1);
	});
	it('should render an input field', () => {
		const inputProps = {
			title: 'myTitle',
			placeHolder: 'myTitle',
			onChange: jest.fn(),
			inputTextValue: 'value',
		};
		const wrapper = shallow(<EditTitle {...inputProps} />);
		expect(wrapper.find('input').getNode().props).toEqual({
			type: 'text',
			className: 'form-control',
			id: 'inputTitle',
			placeholder: inputProps.placeHolder,
			onChange: inputProps.onChange,
			value: inputProps.inputTextValue,
		});
		expect(wrapper.find('input')).toHaveLength(1);
	});
});
