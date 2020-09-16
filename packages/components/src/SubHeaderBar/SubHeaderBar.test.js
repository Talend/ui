import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action, ActionBar } from '../index';
import SubHeaderBar from './SubHeaderBar.component';
import Skeleton from '../Skeleton';

function getComponent(name) {
	if (name === 'Action') {
		return Action;
	}
	if (name === 'Icon') {
		return Icon;
	}
	return ActionBar;
}

describe('SubHeaderBarActions', () => {
	it('should render with center props', () => {
		const props = {
			title: 'myTitle',
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
		};
		const wrapper = shallow(
			<SubHeaderBar.Content {...props}>
				<Action
					label="action1"
					bsStyle="link"
					icon="talend-share-alt"
					onClick={jest.fn()}
					hideLabel
				/>
				<Action
					label="action2"
					bsStyle="link"
					icon="talend-activity"
					onClick={jest.fn()}
					hideLabel
				/>
				<Icon name="talend-bell" />
			</SubHeaderBar.Content>,
		);
		expect(wrapper.find(ActionBar.Content)).toHaveLength(1);
		expect(wrapper.find(ActionBar.Content).get(0).props.center).toBeTruthy();
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
	});
	it('should render with right props', () => {
		const props = {
			left: false,
			center: false,
			right: true,
			className: 'myClassName',
		};
		const wrapper = shallow(
			<SubHeaderBar.Content {...props}>
				<Action
					label="action1"
					bsStyle="link"
					icon="talend-share-alt"
					onClick={jest.fn()}
					hideLabel
				/>
				<Action
					label="action2"
					bsStyle="link"
					icon="talend-activity"
					onClick={jest.fn()}
					hideLabel
				/>
				<Icon name="talend-bell" />
			</SubHeaderBar.Content>,
		);
		expect(wrapper.find(ActionBar.Content)).toHaveLength(1);
		expect(wrapper.find(ActionBar.Content).get(0).props.right).toBeTruthy();
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
	});
});

let components = {};
let actions = {};

describe('SubHeaderBar', () => {
	beforeEach(() => {
		actions = {
			left: [
				{
					label: 'action1',
					bsStyle: 'link',
					icon: 'talend-share-alt',
					onClick: jest.fn(),
					hideLabel: true,
				},
				{
					component: 'Action',
					label: 'action2',
					bsStyle: 'link',
					icon: 'talend-activity',
					onClick: jest.fn(),
					hideLabel: true,
				},
			],
			center: [
				{
					component: 'Action',
					label: 'action3',
					bsStyle: 'link',
					icon: 'talend-activity',
					onClick: jest.fn(),
					hideLabel: true,
				},
			],
			right: [
				{
					component: 'Action',
					label: 'action3',
					bsStyle: 'link',
					icon: 'talend-activity',
					onClick: jest.fn(),
					hideLabel: true,
				},
			],
		};
		components = {
			center: [
				{
					component: 'WhatEver',
					foo: 'bar',
				},
			],
			right: [
				{
					component: 'WhatEver',
					foo: 'baz',
				},
				{
					component: 'WhatEver',
					foo: 'bat',
				},
			],
		};
	});
	it('should render without i18n', () => {
		const props = {
			title: 'myTitle',
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
			...actions,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.getElement().props.i18n).toBeFalsy();
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render SubHeaderBarActions (default + custom)', () => {
		const props = {
			title: 'myTitle',
			getComponent,
			components,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBar.Inject)).toHaveLength(3);
		expect(wrapper.find(SubHeaderBar.Inject).get(0).props.foo).toBe('bar');
		expect(wrapper.find(SubHeaderBar.Inject).get(1).props.foo).toBe('baz');
		expect(wrapper.find(SubHeaderBar.Inject).get(2).props.foo).toBe('bat');
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(1);
		expect(wrapper.find(SubHeaderBar.Content).get(0).props.left).toBeTruthy();
	});
	it('should render SubHeaderBarActions (default + right)', () => {
		const props = {
			title: 'myTitle',
			right: actions.right,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(2);
		expect(wrapper.find(SubHeaderBar.Content).get(0).props.left).toBeTruthy();
		expect(wrapper.find(SubHeaderBar.Content).get(1).props.right).toBeTruthy();
	});
	it('should render SubHeaderBarActions (default + center)', () => {
		const props = {
			title: 'myTitle',
			center: actions.center,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(2);
		expect(wrapper.find(SubHeaderBar.Content).get(0).props.left).toBeTruthy();
		expect(wrapper.find(SubHeaderBar.Content).get(1).props.center).toBeTruthy();
	});
	it('should render SubHeaderBarActions (default)', () => {
		const props = {
			title: 'myTitle',
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(1);
		expect(wrapper.find(SubHeaderBar.Content).get(0).props.left).toBeTruthy();
	});

	it('Should render SubHeader component if right actions are in loading state', () => {
		const props = {
			title: 'myTitle',
			rightActionsLoading: true,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(2);
		expect(wrapper.find(SubHeaderBar.Content).at(1).find(Skeleton)).toHaveLength(1);
	});
});

describe('CustomInject', () => {
	it('should render wrapped Inject in SubHeaderBarActions', () => {
		const props = {
			component: 'Action',
			getComponent: jest.fn(getComponent),
			left: true,
			extra: 'foo',
		};
		const wrapper = shallow(<SubHeaderBar.Inject {...props} />);
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(1);
		expect(wrapper.find(SubHeaderBar.Content).get(0).props.left).toBeTruthy();
		expect(wrapper.find(SubHeaderBar.Content).get(0).props.children).toBeDefined();
		expect(wrapper.find('Inject')).toHaveLength(1);
		expect(wrapper.find('Inject').get(0).props).toEqual({
			extra: props.extra,
			component: props.component,
			getComponent: props.getComponent,
		});
	});
	it('should render nowrapped Inject if nowrap props', () => {
		const props = {
			component: 'Action',
			getComponent: jest.fn(getComponent),
			left: true,
			nowrap: true,
			extra: 'foo',
		};
		const wrapper = shallow(<SubHeaderBar.Inject {...props} />);
		expect(wrapper.find(SubHeaderBar.Content)).toHaveLength(0);
		expect(wrapper.find('Inject')).toHaveLength(1);
		expect(wrapper.find('Inject').get(0).props).toEqual({
			extra: props.extra,
			component: props.component,
			getComponent: props.getComponent,
		});
	});
});
