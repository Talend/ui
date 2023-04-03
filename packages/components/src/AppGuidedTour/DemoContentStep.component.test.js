import { render, screen, waitFor } from '@testing-library/react';

import Stepper from '../Stepper';
import DemoContentStep from './DemoContentStep.component';

jest.unmock('@talend/design-system');

describe('DemOContentStep', () => {
	it('should show the demo content step', async () => {
		render(
			<DemoContentStep
				demoContentSteps={[
					{ label: 'Importing dataset', status: Stepper.LOADING_STEP_STATUSES.FAILURE },
				]}
			/>,
		);
		await waitFor(() => {
			expect(screen.getByText('Importing dataset')).toBeVisible();
		});
	});

	it('should show nothing when no step', () => {
		render(<DemoContentStep demoContentSteps={[]} />);
		expect(screen.queryByText('Importing dataset')).not.toBeInTheDocument();
	});
});
