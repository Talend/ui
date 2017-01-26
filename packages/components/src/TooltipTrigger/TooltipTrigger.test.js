import React from 'react';
import renderer from 'react-test-renderer';

import TooltipTrigger from './TooltipTrigger.component';

jest.mock('react-dom');

describe('ActionTooltip', () => {
	it('should render tooltip', () => {
		// given
		const props = {
			label: 'toto',
			tooltipPlacement: 'right',
		};

		// when
		const wrapper = renderer
			.create(<TooltipTrigger {...props} ><div>Action</div></TooltipTrigger>)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
