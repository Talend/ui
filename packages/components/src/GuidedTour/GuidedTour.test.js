import React from 'react';
import { mount } from 'enzyme';
import Tour from 'reactour';

import GuidedTour from './GuidedTour.component';

describe('Guided Tour', () => {
	const steps = [{ content: { body: 'foo' } }, { content: { body: 'bar' } }];

	it('should appear', () => {
		// when
		const wrapper = mount(<GuidedTour steps={steps} isOpen />);

		// then
		expect(wrapper.find(Tour).children()).toHaveLength(1);
	});

	it('should not appear if steps are empty', () => {
		// when
		const wrapper = mount(<GuidedTour steps={[]} isOpen />);

		// then
		expect(wrapper.find(Tour).children()).toHaveLength(0);
	});

	it('should not appear if it is not open', () => {
		// when
		const wrapper = mount(<GuidedTour steps={steps} isOpen={false} />);

		// then
		expect(wrapper.find(Tour).children()).toHaveLength(0);
	});
});
