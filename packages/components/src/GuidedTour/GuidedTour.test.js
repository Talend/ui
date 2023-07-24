import { render } from '@testing-library/react';

import GuidedTour from './GuidedTour.component';

describe('Guided Tour', () => {
	const steps = [{ content: { body: 'foo' } }, { content: { body: 'bar' } }];

	it('should appear', () => {
		// when
		render(<GuidedTour steps={steps} isOpen />);

		// then
		expect(document.querySelector('#___reactour')).toBeVisible();
	});

	it('should not appear if steps are empty', () => {
		// when
		render(<GuidedTour steps={[]} isOpen />);

		// then
		expect(document.querySelector('#___reactour')).not.toBeInTheDocument();
	});

	it('should not appear if it is not open', () => {
		// when
		render(<GuidedTour steps={steps} isOpen={false} />);

		// then
		expect(document.querySelector('#___reactour')).not.toBeInTheDocument();
	});
});
