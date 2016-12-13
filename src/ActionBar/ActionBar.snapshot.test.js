import React from 'react';
import renderer from 'react-test-renderer';

import ActionBar from './ActionBar.component';

jest.mock('react-dom');

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

describe('ActionBar', () => {
	it('should render without actions', () => {
		// when
		const wrapper = renderer.create(<ActionBar />).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render no-selected actions, all on left ', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				left: [primaryAction, secondaryAction],
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
				right: [secondaryAction],
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
				right: [primaryAction, secondaryAction],
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
				left: [secondaryAction, secondaryAction],
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
				right: [secondaryAction],
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
				right: [secondaryAction, secondaryAction],
			},
		};
		// when
		const wrapper = renderer.create(
			<ActionBar {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
});
