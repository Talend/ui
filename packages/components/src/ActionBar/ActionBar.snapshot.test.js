import React from 'react';
import renderer from 'react-test-renderer';

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
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
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
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
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
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
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
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render selected count and multi-selected actions,' +
		' count and some actions on left, the other on right', () => {
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
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

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
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a btn-group', () => {
		const props = {
			actions: {
				left: [btnGroupAction],
			},
		};
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
