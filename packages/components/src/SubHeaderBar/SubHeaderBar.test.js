import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action, ActionBar } from '../index';
import Container, { SubHeaderBar, SubHeaderBarActions } from './SubHeaderBar.component';

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
			title: 'myTitle',
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
			components,
		};
		const wrapper = shallow(<SubHeaderBarActions {...props} />);
		expect(wrapper.instance().props.center).toEqual(true);
		expect(wrapper.find(ActionBar.Content)).toHaveLength(3);
		expect(wrapper.find(ActionBar.Content).get(0).props.center).toEqual(true);
		expect(wrapper.find(ActionBar.Content).get(1).props.center).toEqual(true);
		expect(wrapper.find(ActionBar.Content).get(2).props.center).toEqual(true);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
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
		expect(wrapper.instance().props.right).toEqual(true);
		expect(wrapper.find(ActionBar.Content)).toHaveLength(3);
		expect(wrapper.find(ActionBar.Content).get(0).props.right).toEqual(true);
		expect(wrapper.find(ActionBar.Content).get(1).props.right).toEqual(true);
		expect(wrapper.find(ActionBar.Content).get(2).props.right).toEqual(true);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
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
	it('should render with i18n', () => {
		const props = {
			title: 'myTitle',
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
			components,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<Container {...props} />);
		expect(wrapper.getNode().props.i18n).toBeDefined();
	});
	it('should render without i18n', () => {
		const props = {
			title: 'myTitle',
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
			components,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.getNode().props.i18n).toBeFalsy();
		expect(wrapper.getNode()).toMatchSnapshot();
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
		expect(wrapper.find(SubHeaderBarActions).get(0).props.left).toEqual(true);
		expect(wrapper.find(SubHeaderBarActions).get(1).props.center).toEqual(true);
		expect(wrapper.find(SubHeaderBarActions).get(2).props.right).toEqual(true);
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
		expect(wrapper.find(SubHeaderBarActions).get(0).props.left).toEqual(true);
		expect(wrapper.find(SubHeaderBarActions).get(1).props.right).toEqual(true);
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
		expect(wrapper.find(SubHeaderBarActions).get(0).props.left).toEqual(true);
		expect(wrapper.find(SubHeaderBarActions).get(1).props.center).toEqual(true);
	});
	it('should render SubHeaderBarActions (default)', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(1);
		expect(wrapper.find(SubHeaderBarActions).get(0).props.left).toEqual(true);
	});
});
