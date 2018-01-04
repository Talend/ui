import React from 'react';
import { shallow } from 'enzyme';

import ActionBar from './ActionBar.component';

const primaryAction = {
	label: 'Primary',
	icon: 'fa fa-asterisk',
	onClick: jest.fn(),
	bsStyle: 'primary',
};

const secondaryAction = {
	label: 'Secondary',
	icon: 'fa fa-asterisk',
	onClick: jest.fn(),
};

const splitAction = {
	displayMode: 'splitDropdown',
	label: 'Add File',
	icon: 'fa fa-plus',
	onClick: jest.fn(),
	items: [
		{
			label: 'From Local',
			onClick: jest.fn(),
		},
		{
			label: 'From Remote',
			onClick: jest.fn(),
		},
	],
	emptyDropdownLabel: 'No option',
};

const btnGroupAction = {
	displayMode: 'btnGroup',
	actions: [
		{
			label: 'hidden mean tooltips',
			icon: 'talend-cog',
			hideLabel: true,
			onClick: jest.fn(),
		},
		{
			label: 'you are a super star',
			icon: 'talend-badge',
			hideLabel: true,
			onClick: jest.fn(),
		},
	],
};

describe('ActionBar', () => {
	it('should render no-selected actions, all on left ', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				left: [primaryAction, secondaryAction, splitAction],
			},
		};
		// when
		const wrapper = shallow(<ActionBar {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		const switchActions = wrapper.find(ActionBar.SwitchActions);
		expect(switchActions.props().left).toBe(true);
		expect(switchActions.props().selected).toBe(0);
	});

	it('should render no-selected actions, some on left, the other on right', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				left: [primaryAction],
				right: [secondaryAction, splitAction],
			},
		};
		// when
		const wrapper = shallow(<ActionBar {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render no-selected actions, all on right', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				right: [primaryAction, secondaryAction, splitAction],
			},
		};
		// when
		const wrapper = shallow(<ActionBar {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render selected count and multi-selected actions, all on left', () => {
		// given
		const props = {
			selected: 1,
			actions: {},
			multiSelectActions: {
				left: [secondaryAction, secondaryAction, splitAction],
			},
		};
		// when
		const wrapper = shallow(<ActionBar {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it(
		'should render selected count and multi-selected actions,' +
			' count and some actions on left, the other on right',
		() => {
			// given
			const props = {
				selected: 1,
				actions: {},
				multiSelectActions: {
					left: [secondaryAction],
					right: [secondaryAction, splitAction],
				},
			};
			// when
			const wrapper = shallow(<ActionBar {...props} />);
			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		},
	);

	it('should render selected count and multi-selected actions, all on right', () => {
		// given
		const props = {
			selected: 1,
			actions: {},
			multiSelectActions: {
				right: [secondaryAction, secondaryAction, splitAction],
			},
		};
		// when
		const wrapper = shallow(<ActionBar {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a btn-group', () => {
		const props = {
			actions: {
				left: [btnGroupAction],
			},
		};
		const wrapper = shallow(<ActionBar {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('ActionBar.Count', () => {
	it('should render if selected', () => {
		const wrapper = shallow(<ActionBar.Count selected={1} />);
		const noselected = shallow(<ActionBar.Count />);
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(noselected.getElement()).toBe(null);
	});
});

describe('ActionBar.SwitchActions', () => {
	const actions = [{ label: 'action' }];
	it('should render one Action on navbar-left', () => {
		const wrapper = shallow(<ActionBar.SwitchActions actions={actions} left />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render one Action on navbar-right', () => {
		const wrapper = shallow(<ActionBar.SwitchActions actions={actions} right />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render one Action on navbar-left with selected', () => {
		const wrapper = shallow(<ActionBar.SwitchActions selected={3} actions={actions} left />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should not render selected on right', () => {
		const wrapper = shallow(<ActionBar.SwitchActions selected={3} right />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
