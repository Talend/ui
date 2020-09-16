import React from 'react';
import { shallow } from 'enzyme';

import Stepper from '../Stepper';
import DemoContentStep from './DemoContentStep.component';

describe('DemOContentStep', () => {
	it('should show the demo content step', () => {
		const wrapper = shallow(
			<DemoContentStep
				demoContentSteps={[
					{ label: 'Importing dataset', status: Stepper.LOADING_STEP_STATUSES.FAILURE },
				]}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('Stepper').length).toBe(1);
	});

	it('should show nothing when no step', () => {
		const wrapper = shallow(<DemoContentStep demoContentSteps={[]} />);

		expect(wrapper.find('Stepper').length).toBe(0);
	});
});
