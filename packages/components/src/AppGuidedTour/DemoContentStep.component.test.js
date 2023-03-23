import React from 'react';
import { render, screen } from '@testing-library/react';

import Stepper from '../Stepper';
import DemoContentStep from './DemoContentStep.component';

describe('DemOContentStep', () => {
	it('should show the demo content step', () => {
		render(
			<DemoContentStep
				demoContentSteps={[
					{ label: 'Importing dataset', status: Stepper.LOADING_STEP_STATUSES.FAILURE },
				]}
			/>,
		);
		expect(screen.getByText('Importing dataset')).toBeVisible();
	});

	it('should show nothing when no step', () => {
		render(<DemoContentStep demoContentSteps={[]} />);
		expect(screen.queryByText('Importing dataset')).not.toBeInTheDocument();
	});
});
