/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import { Action } from '../Actions';
import Icon from '../Icon';
import ActionBar from '../ActionBar';
import SubHeaderBar from './SubHeaderBar.component';

function getComponent(name) {
	if (name === 'Action') {
		return Action;
	}
	if (name === 'Icon') {
		return Icon;
	}
	if (name === 'WhatEver') {
		return ({ foo }) => <div data-testid="WhatEver">{foo}</div>;
	}
	return ActionBar;
}

describe('SubHeaderBarActions', () => {
	it('should render with center props', () => {
		const props = {
			left: false,
			center: true,
			right: false,
		};
		render(
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
				<Icon name="talend-bell" data-testid="Icon" />
			</SubHeaderBar.Content>,
		);
		expect(screen.getAllByRole('button')).toHaveLength(2);
		expect(screen.getByTestId('Icon')).toBeInTheDocument();
		expect(document.querySelector('.tc-subheader-center')).toBeInTheDocument();
	});
	it('should render with right props', () => {
		const props = {
			left: false,
			center: false,
			right: true,
		};
		render(
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
				<Icon name="talend-bell" data-testid="Icon" />
			</SubHeaderBar.Content>,
		);
		expect(screen.getAllByRole('button')).toHaveLength(2);
		expect(screen.getByTestId('Icon')).toBeInTheDocument();
		expect(document.querySelector('.tc-subheader-right')).toBeInTheDocument();
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
					label: 'action4',
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
	it('should render', () => {
		const props = {
			title: 'myTitle',
			left: false,
			center: true,
			right: false,
			className: 'myClassName',
			...actions,
			onGoBack: jest.fn(),
		};
		const { container } = render(<SubHeaderBar {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render SubHeaderBar (default + custom)', () => {
		const props = {
			title: 'myTitle',
			getComponent,
			components,
			onGoBack: jest.fn(),
		};
		render(<SubHeaderBar {...props} />);
		expect(screen.getByText('myTitle')).toBeVisible();

		// Inject
		expect(screen.getByText('bar')).toBeVisible();
		expect(screen.getByText('baz')).toBeVisible();
		expect(screen.getByText('bat')).toBeVisible();
	});
	it('should render SubHeaderBar (default + right)', () => {
		const props = {
			title: 'myTitle',
			right: actions.right,
			onGoBack: jest.fn(),
		};
		render(<SubHeaderBar {...props} />);
		expect(screen.getByText('myTitle')).toBeVisible();
		expect(screen.getByLabelText('action4')).toBeVisible();
		expect(screen.getByLabelText('action4').parentElement).toHaveClass('navbar-right');
	});
	it('should render SubHeaderBar (default + center)', () => {
		const props = {
			title: 'myTitle',
			center: actions.center,
			onGoBack: jest.fn(),
		};
		render(<SubHeaderBar {...props} />);
		expect(screen.getByText('myTitle')).toBeVisible();
		expect(screen.getByLabelText('action3')).toBeVisible();
		expect(screen.getByLabelText('action3').parentElement).toHaveClass('theme-navbar-center');
	});
	it('should render SubHeaderBar (default)', () => {
		const props = {
			title: 'myTitle',
			onGoBack: jest.fn(),
		};
		render(<SubHeaderBar {...props} />);
		expect(screen.getByText('myTitle')).toBeVisible();
		expect(screen.getByTestId('tc-subheader-backArrow')).toBeVisible();
	});

	it('Should render SubHeader component if right actions are in loading state', () => {
		const props = {
			title: 'myTitle',
			rightActionsLoading: true,
			onGoBack: jest.fn(),
		};
		render(<SubHeaderBar {...props} />);
		expect(screen.getByLabelText('text Loading...')).toHaveClass('tc-skeleton');
		expect(screen.getByLabelText('text Loading...').parentElement).toHaveClass('navbar-right');
	});
});

describe('CustomInject', () => {
	it('should render wrapped Inject in SubHeaderBarActions', () => {
		const props = {
			component: 'Action',
			getComponent: jest.fn(getComponent),
			left: true,
			label: 'foo',
		};
		render(<SubHeaderBar.Inject {...props} />);
		expect(props.getComponent).toHaveBeenCalledWith(props.component);
		expect(screen.getByText('foo')).toBeVisible();
		expect(screen.getByRole('button').parentElement).toHaveClass('navbar-left');
	});
	it('should render nowrapped Inject if nowrap props', () => {
		const props = {
			component: 'Action',
			getComponent: jest.fn(getComponent),
			left: true,
			nowrap: true,
			label: 'foo',
		};
		render(<SubHeaderBar.Inject {...props} />);
		expect(props.getComponent).toHaveBeenCalledWith(props.component);
		expect(screen.getByText('foo')).toBeVisible();
		expect(screen.getByRole('button').parentElement).not.toHaveClass('navbar-left');
	});
});
