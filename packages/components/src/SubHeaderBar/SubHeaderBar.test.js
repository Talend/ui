import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action } from '../index';
// import InputTitleSubHeader from './InputTitleSubHeader';
import SubHeaderBar, { SubHeaderBarActions } from './SubHeaderBar.component';

let components = [];
describe('SubHeaderBarActions', () => {
	beforeEach(() => {
		components = [
			{
				injectedComponent: (
					<Action
						label="action1"
						bsStyle="link"
						icon="talend-share-alt"
						onClick={jest.fn()}
						hideLabel
					/>
				),
			},
			{
				injectedComponent: (
					<Action
						label="action2"
						bsStyle="link"
						icon="talend-activity"
						onClick={jest.fn()}
						hideLabel
					/>
				),
			},
			{
				injectedComponent: <Icon name="talend-bell" />,
			},
		];
	});
	it('should render with center props', () => {
		const props = {
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
			components,
		};
		const wrapper = shallow(<SubHeaderBarActions {...props} />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with right props', () => {
		const props = {
			left: false,
			center: false,
			right: true,
			className: 'myClassName',
			components,
		};
		const wrapper = shallow(<SubHeaderBarActions {...props} />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

let componentsRight = [];
let componentsCenter = [];
describe('SubHeaderBar', () => {
	beforeEach(() => {
		componentsRight = [
			{
				injectedComponent: (
					<Action
						label="action1"
						bsStyle="link"
						icon="talend-share-alt"
						onClick={jest.fn()}
						hideLabel
					/>
				),
			},
			{
				injectedComponent: (
					<Action
						label="action2"
						bsStyle="link"
						icon="talend-activity"
						onClick={jest.fn()}
						hideLabel
					/>
				),
			},
		];
		componentsCenter = [
			{
				injectedComponent: (
					<Action
						label="action3"
						bsStyle="link"
						icon="talend-activity"
						onClick={jest.fn()}
						hideLabel
					/>
				),
			},
		];
	});
	it('should render SubHeaderBarActions (default + custom)', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			componentsCenter,
			componentsRight,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(3);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render SubHeaderBarActions (default + right)', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			componentsRight,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render SubHeaderBarActions (default + center)', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			componentsCenter,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render SubHeaderBarActions (default)', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render SubHeaderBarActions (default)', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
