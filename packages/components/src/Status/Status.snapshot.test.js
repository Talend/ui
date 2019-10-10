import React from 'react';
import renderer from 'react-test-renderer';

import { Status, STATUS } from './Status.component';

jest.mock('react-dom');

const currentStatus = {
	status: 'successful',
	label: 'Successful',
	icon: 'fa fa-check',
	actions: [
		{
			label: 'cancel',
			icon: 'fa fa-cancel',
			onClick: jest.fn(),
			bsSize: 'small',
		},
		{
			label: 'delete',
			icon: 'fa fa-delete',
			onClick: jest.fn(),
			bsSize: 'small',
		},
	],
};

const inProgressStatus = {
	status: 'inProgress',
	label: 'In Progress',
	actions: [
		{
			label: 'cancel',
			icon: 'fa fa-cancel',
			onClick: jest.fn(),
			bsSize: 'small',
		},
		{
			label: 'delete',
			icon: 'fa fa-delete',
			onClick: jest.fn(),
			bsSize: 'small',
		},
	],
};

const inProgressStatusWithPercent = {
	status: 'inProgress',
	label: 'In Progress',
	percent: '70',
	actions: [
		{
			label: 'cancel',
			icon: 'fa fa-cancel',
			onClick: jest.fn(),
			bsSize: 'small',
		},
		{
			label: 'delete',
			icon: 'fa fa-delete',
			onClick: jest.fn(),
			bsSize: 'small',
		},
	],
};

const skeletonStatusProps = {
	status: STATUS.SKELETON,
};

describe('Status', () => {
	it('should render a label with Icon', () => {
		// when
		const wrapper = renderer.create(<Status {...currentStatus} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a label', () => {
		// given
		const props = {
			...currentStatus,
			icon: '',
		};

		// when
		const wrapper = renderer.create(<Status {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a label with Icon without actions', () => {
		// when
		const wrapper = renderer.create(<Status {...currentStatus} actions={[]} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a label with a continuous circular progress', () => {
		// when
		const wrapper = renderer.create(<Status {...inProgressStatus} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a label with a fixed circular progress', () => {
		// when
		const wrapper = renderer.create(<Status {...inProgressStatusWithPercent} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a label with a skeleton', () => {
		// when
		const wrapper = renderer.create(<Status {...skeletonStatusProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
