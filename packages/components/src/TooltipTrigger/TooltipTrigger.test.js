import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TooltipTrigger from './TooltipTrigger.component';

jest.mock('react-dom');

describe('ActionTooltip', () => {
	it('should render only the children', () => {
		// given
		const props = {
			label: 'toto',
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
			label: 'toto',
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
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render custom tooltip when focus the children', () => {
		// given
		const props = {
			ariaLabel: 'a custom tooltip',
			label: <div>a custom tooltip</div>,
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
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render tooltip when hover the children', () => {
		// given
		const props = {
			label: 'toto',
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
		expect(wrapper.update().getElement()).toMatchSnapshot();
	});
});
