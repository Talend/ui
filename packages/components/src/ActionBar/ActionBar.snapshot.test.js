import React from 'react';
import { shallow, mount } from 'enzyme';
import toJsonWithoutI18n from '../../test/props-without-i18n';

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
		const wrapperMounted = mount(<ActionBar {...props} />);
		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
		const switchActions = wrapperMounted.find(ActionBar.SwitchActions).first();
		expect(switchActions.props().left).toBe(true);
		expect(switchActions.props().components).toBeUndefined();
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
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
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
		const wrapper = mount(<ActionBar {...props} />).find('nav');
		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
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
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
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
			expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
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
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should render a btn-group', () => {
		const props = {
			actions: {
				left: [btnGroupAction],
			},
		};
		const wrapper = shallow(<ActionBar {...props} />);
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});
});

describe('ActionBar.Count', () => {
	it('should render if selected', () => {
		const wrapper = shallow(
			<ActionBar.Count selected={1} t={(key, value) => `${value.selected} ${key}`} />,
		);
		const noselected = shallow(<ActionBar.Count />);
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
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
	it('should render one Action on navbar-left with an injection', () => {
		const countComponent = (
			<ActionBar.Count selected={3} t={(key, value) => `${value.selected} ${key}`} />
		);
		const components = {
			'before-actions': countComponent,
		};

		const wrapper = shallow(
			<ActionBar.SwitchActions
				actions={actions}
				getComponent="whatever"
				components={components}
				left
			/>,
		);
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});
});
