import React from 'react';
import { mount } from 'enzyme';
import Tour from 'reactour';

import GuidedTour from './GuidedTour.component';

describe('Guided Tour', () => {
	const steps = [{ content: 'foo' }, { content: 'bar' }];

	it('should appear', () => {
		// when
		const wrapper = mount(<GuidedTour steps={steps} isOpen />);

		// then
		expect(wrapper.find(Tour).children()).toHaveLength(1);
	});

	it('should not appear', () => {
		// when
		const wrapper = mount(<GuidedTour steps={steps} isOpen={false} />);

		// then
		expect(wrapper.find(Tour).children()).toHaveLength(0);
	});
});
