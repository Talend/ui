import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import faker from 'faker';

import TooltipTrigger from './TooltipTrigger.component';

jest.mock('react-dom');

faker.seed(42);
describe('ActionTooltip', () => {
	it('should render only the children', () => {
		// given
		const props = {
			label: faker.random.word(),
			tooltipPlacement: 'right',
		};

		// when
		const wrapper = renderer.create(
			<TooltipTrigger {...props}>
				<div>Action</div>
			</TooltipTrigger>,
		);

		// then
		expect(wrapper.toJSON()).toMatchSnapshot();
	});

	it('should render tooltip when focus the children', () => {
		// given
		const props = {
			label: faker.random.word(),
			tooltipPlacement: 'right',
		};

		// when
		const wrapper = shallow(
			<TooltipTrigger {...props}>
				<div>Action</div>
			</TooltipTrigger>,
		);

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		// then
		wrapper.update();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render tooltip when hover the children', () => {
		// given
		const props = {
			label: faker.random.word(),
			tooltipPlacement: 'right',
		};

		// when
		const wrapper = shallow(
			<TooltipTrigger {...props}>
				<div>Action</div>
			</TooltipTrigger>,
		);

		wrapper
			.find('div')
			.at(0)
			.simulate('mouseOver');

		// then
		wrapper.update();
		expect(wrapper).toMatchSnapshot();
	});
});
