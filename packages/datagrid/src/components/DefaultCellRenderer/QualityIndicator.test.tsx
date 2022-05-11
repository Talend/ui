import React from 'react';
import { render, screen } from '@testing-library/react';

import QualityIndicator from './QualityIndicator.component';
import { QUALITY_INVALID_KEY, QUALITY_VALID_KEY } from '../../constants';

describe('#QualityIndicator', () => {
	it('should render when quality index is QUALITY_INVALID_KEY', () => {
		render(<QualityIndicator qualityIndex={QUALITY_INVALID_KEY} />);

		expect(screen.getByTitle('Invalid value')).toBeInTheDocument();
	});

	it('should not render when quality index is different of QUALITY_INVALID_KEY', () => {
		render(<QualityIndicator qualityIndex={QUALITY_VALID_KEY} />);

		expect(screen.queryByTitle('Invalid value')).not.toBeInTheDocument();
	});
});
