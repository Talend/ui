import React from 'react';
import { mount } from 'enzyme';
import Flag from './Flag.component';
import featureFlag from '../service';

const FEATURE_TEST = 'FEATURE_TEST';

function Feature() {
	return <span>feature</span>;
}

describe('Flag', () => {
	it('should show/hide a feature', () => {
		const wrapper = mount(
			<Flag featureName={FEATURE_TEST}>
				<Feature />
			</Flag>,
		);

		expect(wrapper.find(Feature).length).toBe(0);
		expect(featureFlag.observers.length).toBe(1);

		featureFlag.enable(FEATURE_TEST);
		wrapper.update();

		expect(wrapper.find(Feature).length).toBe(1);

		wrapper.unmount();

		expect(featureFlag.observers.length).toBe(0);
	});
});
